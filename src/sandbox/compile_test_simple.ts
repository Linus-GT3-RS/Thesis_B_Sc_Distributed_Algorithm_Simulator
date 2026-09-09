import { BiDirectionalEdgeState } from "../domain_layer/components/algorithm_plugins/plugin_api/entities/state_entities/Edges.js";
import { NodeLog } from "../domain_layer/components/algorithm_plugins/plugin_api/entities/state_entities/Logs.js";
import { MessageState } from "../domain_layer/components/algorithm_plugins/plugin_api/entities/state_entities/Messages.js";
import { NodeState } from "../domain_layer/components/algorithm_plugins/plugin_api/entities/state_entities/Nodes.js";
import { EchoAlgorithmNodeProcess } from "../domain_layer/components/algorithm_plugins/plugins/echo_algorithm/EchoAlgoNodeProcess.js";
import { SnapshotDataWorker } from "../domain_layer/components/simulation/data/SnapshotWorker.js";
import { ISimulationEngine, SimulationEngine } from "../domain_layer/components/simulation/engine/SimulationEngine.js";
import { DomainController, DomainState } from "../domain_layer/controller/DomainController.js";
import { StateBehavSimulationStopped } from "../domain_layer/controller/impl_state_behaviours/StateBehavSimStopped.js";
import { DomainCommandGateway } from "../domain_layer/gateways/CommandGateway.js";
import { DomainEventGateway } from "../domain_layer/gateways/EventGateway.js";
import { IPresentationCoordinator, PresentationCoordinator } from "../domain_layer/components/simulation/entity_presentation/PresentationCoordinator.js";
import { CascadingChangeObserverCollection, LazyChangeObserverCollection } from "../domain_layer/components/simulation/entity_observation/EntityCollectionObserver.js";
import { buildGraph5 } from "./graphs.js";
import { StyleRulesetProviderEchoAlgoEdgeState, StyleRulesetProviderEchoAlgoMessageState, StyleRulesetProviderEchoAlgoNodeState } from "../domain_layer/components/algorithm_plugins/plugins/echo_algorithm/presentation/StyleProvider.js";
import { DetailProviderEchoAlgoMessageData, DetailProviderEchoAlgoNodeState, DetailProviderEdgeState } from "../domain_layer/components/algorithm_plugins/plugins/echo_algorithm/presentation/DetailProvider.js";
import { EchoAlgorithmNodeState } from "../domain_layer/components/algorithm_plugins/plugins/echo_algorithm/data/EchoAlgoEntities.js";
import { type IModelBuilderNodeLog, ModelBuilderNodeLog, type IModelBuilderNodeState, ModelBuilderNodeState, type IModelBuilderMessageState, ModelBuilderMessageState, type IModelBuilderEdgeState, ModelBuilderEdgeState } from "@/domain_layer/components/simulation/entity_presentation/models/ModelBuilder.js";


//* Init SimulationSnapshot
const snapshot = buildGraph5();

//* Setup Domain Event Gateway
function emitter(ev: unknown): void {
    console.log(`received ev`);
    console.log(ev);
}
const evGateway: DomainEventGateway = new DomainEventGateway(emitter);


//* Setup EntityCollection Observer
const worker = new SnapshotDataWorker();

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

//* Setup Simulation Engine
const engine: ISimulationEngine = new SimulationEngine<EchoAlgorithmNodeState>(
    snapshot, worker, new EchoAlgorithmNodeProcess(),
    creationObsNodeLogs, updateObsNodeStates, creationObsMessageStates
);

//* Setup Model Builder
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

//* Setup Simulation PresentationCoordinator
const presentationCoord: IPresentationCoordinator = new PresentationCoordinator(
    creationObsNodeLogs, updateObsNodeStates, updateObsEdgeStates, creationObsMessageStates,
    snapshot.logs, snapshot.nodeStates, snapshot.edgeStates, snapshot.msgStates,
    modelBuilderNodeLog, modelBuilderNodeState,
    modelBuilderEdgeState, modelBuilderMessageState,
    evGateway
);


//* Setup Simulation Stopped State
const bevSimStopppedState = new StateBehavSimulationStopped(
    evGateway,
    engine, presentationCoord,
);

//* Setup Controller
const domainController = new DomainController(
    DomainState.SimulationStoppedState, evGateway,
    bevSimStopppedState
);

//* Setup Domain Command Gateway
const cmdGateway = new DomainCommandGateway(domainController, evGateway);


//* Dummy Execution
cmdGateway.receiveCommand({
    type: "CmdSimulateAlgoInit",
    command: { initiator: 0 }
});

while (snapshot.pendingMessages.length > 0) {
    cmdGateway.receiveCommand({
        type: "CmdSimulateTimeAdvance",
        command: { delta: 25 }
    });
}