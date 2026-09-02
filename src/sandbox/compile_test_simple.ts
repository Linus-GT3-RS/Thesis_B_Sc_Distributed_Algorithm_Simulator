import TinyQueue from "tinyqueue";
import { IndexedStore } from "../common/EntityStores.js";
import { BiDirectionalEdgeState } from "../domain_layer/components/algorithm_plugins/api/entities/state_entities/Edges.js";
import { NodeProcessLog } from "../domain_layer/components/algorithm_plugins/api/entities/state_entities/Logs.js";
import { MessageState } from "../domain_layer/components/algorithm_plugins/api/entities/state_entities/Messages.js";
import { NodeState } from "../domain_layer/components/algorithm_plugins/api/entities/state_entities/Nodes.js";
import { EchoAlgorithmNodeState } from "../domain_layer/components/algorithm_plugins/plugins/echo_algorithm/EchoAlgoEntities.js";
import { EchoAlgorithmNodeProcess } from "../domain_layer/components/algorithm_plugins/plugins/echo_algorithm/EchoAlgoNodeProcess.js";
import { PendingMessage, SimulationSnapshot } from "../domain_layer/components/simulation/data/SimulationSnapshot.js";
import { SnapshotDataWorker } from "../domain_layer/components/simulation/data/SnapshotWorker.js";
import { ISimulationEngine, SimulationEngine } from "../domain_layer/components/simulation/engine/SimulationEngine.js";
import { NodeProcessLogObserver, EntityStateObserver, NodeStateObserver, MessageStateObserver } from "../domain_layer/components/simulation/presenter/SimSnapshotObserver.js";
import { DomainController, DomainState } from "../domain_layer/controller/DomainController.js";
import { StateBehavSimulationStopped } from "../domain_layer/controller/impl_state_behaviours/StateBehavSimStopped.js";
import { DomainCommandGateway } from "../domain_layer/gateways/CommandGateway.js";
import { DomainEventGateway } from "../domain_layer/gateways/EventGateway.js";


//* Init SimulationSnapshot
const logStore = new IndexedStore<NodeProcessLog>();
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



//* Setup SimulationEngine
const updates: Set<number> = new Set<number>();
const obsLogs: NodeProcessLogObserver = new EntityStateObserver<NodeProcessLog>(updates);
const obsNodes: NodeStateObserver = new EntityStateObserver<NodeState>(updates);
const obsMsgs: MessageStateObserver = new EntityStateObserver<MessageState>(updates);

const engine: ISimulationEngine = new SimulationEngine<EchoAlgorithmNodeState>(
    snapshot,
    new SnapshotDataWorker(), new EchoAlgorithmNodeProcess(),
    obsLogs, obsNodes, obsMsgs
);



//* Setup Domain
function emitter(ev: unknown): void {
    console.log(`received ev: ${ev}`);
}
const evGateway: DomainEventGateway = new DomainEventGateway(emitter);

const bevSimStopppedState = new StateBehavSimulationStopped(
    evGateway, engine
);

const domainController = new DomainController(
    DomainState.SimulationStoppedState, evGateway,
    bevSimStopppedState
);

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

console.log(snapshot.nodeStates);
console.log(snapshot.logs);