import { buildGraph10, buildGraph5 } from "@/sandbox/graphs";
import { DomainController, DomainState } from "./controller/DomainController";
import { DomainCommandGateway, type IDomainCommandGateway } from "./gateways/CommandGateway";
import { DomainEventGateway, IDomainEventGateway } from "./gateways/EventGateway";
import type { BiDirectionalEdgeState } from "./components/algorithm_plugins/plugin_api/entities/state_entities/Edges";
import type { NodeLog } from "./components/algorithm_plugins/plugin_api/entities/state_entities/Logs";
import type { MessageState } from "./components/algorithm_plugins/plugin_api/entities/state_entities/Messages";
import type { NodeState } from "./components/algorithm_plugins/plugin_api/entities/state_entities/Nodes";
import { SnapshotDataWorker } from "./components/simulation/data/SnapshotWorker";
import { LazyChangeObserverCollection, CascadingChangeObserverCollection } from "./components/simulation/entity_observation/EntityCollectionObserver";
import type { EchoAlgorithmNodeEntity } from "./components/algorithm_plugins/plugins/echo_algorithm/data/EchoAlgoEntities";
import { EchoAlgorithmNodeProcess } from "./components/algorithm_plugins/plugins/echo_algorithm/EchoAlgoNodeProcess";
import { ISimulationEngine, SimulationEngine } from "./components/simulation/engine/SimulationEngine";
import { DetailProviderEchoAlgoNodeState, DetailProviderEchoAlgoMessageData, DetailProviderEdgeState } from "./components/algorithm_plugins/plugins/echo_algorithm/presentation/DetailProvider";
import { StyleRulesetProviderEchoAlgoNodeState, StyleRulesetProviderEchoAlgoMessageState, StyleRulesetProviderEchoAlgoEdgeState } from "./components/algorithm_plugins/plugins/echo_algorithm/presentation/StyleProvider";
import { type IModelBuilderNodeLog, ModelBuilderNodeLog, type IModelBuilderNodeState, ModelBuilderNodeState, type IModelBuilderMessageState, ModelBuilderMessageState, type IModelBuilderEdgeState, ModelBuilderEdgeState } from "./components/simulation/entity_presentation/models/ModelBuilder";
import { PresentationCoordinator, type IPresentationCoordinator } from "./components/simulation/entity_presentation/PresentationCoordinator";
import { StateBehavSimulationStopped } from "./controller/impl_state_behaviours/StateBehavSimStopped";

/**
 * Builds a full DomainLayer
 * 
 * @param sendToUIEventGateway
 * @returns the CommandGateway to the DomainLayer
 */
export function buildDomainLayer(
    sendToUIEventGateway: (message: unknown) => void,
): IDomainCommandGateway {

    //* Setup Domain Event Gateway
    const evGateway: IDomainEventGateway =
        new DomainEventGateway(sendToUIEventGateway);

    //* Setup Domain Command Gateway
    const worker = new SnapshotDataWorker();
    const snapshot = buildGraph5();

    //= Setup EntityCollection Observer
    const creationObsNodeLogs =
        new LazyChangeObserverCollection<NodeLog>(new Set<number>());
    const updateObsEdgeStates =
        new LazyChangeObserverCollection<BiDirectionalEdgeState>(new Set<number>());
    const updateObsNodeStates =
        new CascadingChangeObserverCollection<NodeState, BiDirectionalEdgeState>(
            new Set<number>(), updateObsEdgeStates, (changedNodeState: NodeState) => {
                // gets all Edges that depent on this NodeState
                return worker.getNodeEdges(snapshot.edgeStates, changedNodeState.id);
            }
        );
    const creationObsMessageStates =
        new LazyChangeObserverCollection<MessageState>(new Set<number>());

    //= Setup Simulation Engine
    const engine: ISimulationEngine = new SimulationEngine<EchoAlgorithmNodeEntity>(
        snapshot, worker, new EchoAlgorithmNodeProcess(),
        creationObsNodeLogs, updateObsNodeStates, creationObsMessageStates
    );

    //= Setup Model Builder
    const modelBuilderNodeLog: IModelBuilderNodeLog = new ModelBuilderNodeLog();
    const modelBuilderNodeState: IModelBuilderNodeState = new ModelBuilderNodeState(
        new DetailProviderEchoAlgoNodeState(),
        new StyleRulesetProviderEchoAlgoNodeState()
    );
    const modelBuilderMessageState: IModelBuilderMessageState = new ModelBuilderMessageState(
        new DetailProviderEchoAlgoMessageData(),
        new StyleRulesetProviderEchoAlgoMessageState(),
    );
    const modelBuilderEdgeState: IModelBuilderEdgeState = new ModelBuilderEdgeState(
        new DetailProviderEdgeState(),
        new StyleRulesetProviderEchoAlgoEdgeState()
    );

    //= Setup Simulation PresentationCoordinator
    const presentationCoord: IPresentationCoordinator = new PresentationCoordinator(
        creationObsNodeLogs, updateObsNodeStates, updateObsEdgeStates, creationObsMessageStates,
        snapshot.logs, snapshot.nodeStates, snapshot.edgeStates, snapshot.msgStates,
        modelBuilderNodeLog, modelBuilderNodeState,
        modelBuilderEdgeState, modelBuilderMessageState,
        evGateway
    );

    //= Setup Simulation Stopped State
    const bevSimStopppedState = new StateBehavSimulationStopped(
        evGateway,
        engine, presentationCoord,
    );

    //= Setup Controller
    const domainController = new DomainController(
        DomainState.SimulationStoppedState, evGateway,
        bevSimStopppedState
    );

    //= Setup Domain Command Gateway
    const cmdGateway = new DomainCommandGateway(domainController, evGateway);

    return cmdGateway;
}