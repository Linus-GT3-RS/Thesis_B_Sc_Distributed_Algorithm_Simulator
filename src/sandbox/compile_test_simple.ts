import TinyQueue from "tinyqueue";
import { IndexedStore } from "../common/EntityStores.js";
import { BiDirectionalEdgeState } from "../domain_layer/components/algorithm_plugins/api/entities/state_entities/Edges.js";
import { NodeLog } from "../domain_layer/components/algorithm_plugins/api/entities/state_entities/Logs.js";
import { MessageState } from "../domain_layer/components/algorithm_plugins/api/entities/state_entities/Messages.js";
import { NodeState } from "../domain_layer/components/algorithm_plugins/api/entities/state_entities/Nodes.js";
import { EchoAlgorithmNodeState } from "../domain_layer/components/algorithm_plugins/plugins/echo_algorithm/EchoAlgoEntities.js";
import { EchoAlgorithmNodeProcess } from "../domain_layer/components/algorithm_plugins/plugins/echo_algorithm/EchoAlgoNodeProcess.js";
import { PendingMessage, SimulationSnapshot } from "../domain_layer/components/simulation/data/SimulationSnapshot.js";
import { SnapshotDataWorker } from "../domain_layer/components/simulation/data/SnapshotWorker.js";
import { ISimulationEngine, SimulationEngine } from "../domain_layer/components/simulation/engine/SimulationEngine.js";
import { DomainController, DomainState } from "../domain_layer/controller/DomainController.js";
import { StateBehavSimulationStopped } from "../domain_layer/controller/impl_state_behaviours/StateBehavSimStopped.js";
import { DomainCommandGateway } from "../domain_layer/gateways/CommandGateway.js";
import { DomainEventGateway } from "../domain_layer/gateways/EventGateway.js";
import { ModelBuilderEdgeState, ModelBuilderMessageState, ModelBuilderNodeLog, ModelBuilderNodeState } from "../domain_layer/components/simulation/entity_presentation/models/PresentationModelBuilder.js";
import { IPresentationCoordinator, PresentationCoordinator } from "../domain_layer/components/simulation/entity_presentation/PresentationCoordinator.js";
import { CascadingChangeObserverCollection, LazyChangeObserverCollection } from "../domain_layer/components/simulation/entity_observation/EntityCollectionObserver.js";


//* Init SimulationSnapshot
const logStore = new IndexedStore<NodeLog>();
const nodeStore = new IndexedStore<EchoAlgorithmNodeState>();
const edgeStore = new IndexedStore<BiDirectionalEdgeState>();
const msgStore = new IndexedStore<MessageState>();
const pendingMsgs = new TinyQueue(
    [],
    (a: PendingMessage, b: PendingMessage) => {
        return a.destinationTime - b.destinationTime;
    }
);

const snapshot = new SimulationSnapshot(
    logStore, nodeStore, edgeStore, msgStore, pendingMsgs, 0
);

nodeStore.insert(new EchoAlgorithmNodeState(0, false, false, 0, null));
nodeStore.insert(new EchoAlgorithmNodeState(1, false, false, 0, null));
nodeStore.insert(new EchoAlgorithmNodeState(2, false, false, 0, null));
nodeStore.insert(new EchoAlgorithmNodeState(3, false, false, 0, null));
nodeStore.insert(new EchoAlgorithmNodeState(4, false, false, 0, null));

edgeStore.insert(new BiDirectionalEdgeState(0, { id: 0 }, { id: 1 }, 100));
edgeStore.insert(new BiDirectionalEdgeState(1, { id: 0 }, { id: 2 }, 110));
edgeStore.insert(new BiDirectionalEdgeState(2, { id: 2 }, { id: 3 }, 120));
edgeStore.insert(new BiDirectionalEdgeState(3, { id: 2 }, { id: 4 }, 130));
edgeStore.insert(new BiDirectionalEdgeState(4, { id: 1 }, { id: 4 }, 140));


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

//* Setup Simulation PresentationCoordinator
const presentationCoord: IPresentationCoordinator = new PresentationCoordinator(
    creationObsNodeLogs, updateObsNodeStates, updateObsEdgeStates, creationObsMessageStates,
    snapshot.logs, snapshot.nodeStates, snapshot.edgeStates, snapshot.msgStates,
    new ModelBuilderNodeLog(), new ModelBuilderNodeState(),
    new ModelBuilderEdgeState(), new ModelBuilderMessageState(),
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