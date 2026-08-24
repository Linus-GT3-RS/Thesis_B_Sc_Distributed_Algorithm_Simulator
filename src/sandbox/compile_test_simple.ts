import TinyQueue from "tinyqueue";
import { IndexedStore } from "../../src/common/EntityStores.js";
import { BiDirectionalEdgeState } from "../../src/domain_layer/components/algorithm_plugins/api/entities/state_entities/Edges.js";
import { NodeProcessLog } from "../../src/domain_layer/components/algorithm_plugins/api/entities/state_entities/Logs.js";
import { MessageState } from "../../src/domain_layer/components/algorithm_plugins/api/entities/state_entities/Messages.js";
import { EchoAlgorithmNodeState } from "../../src/domain_layer/components/algorithm_plugins/plugins/echo_algorithm/EchoAlgoEntities.js";
import { PendingMessage, SimulationSnapshot } from "../../src/domain_layer/components/simulation/SimulationSnapshot.js";
import { EchoAlgorithmNodeProcess } from "../../src/domain_layer/components/algorithm_plugins/plugins/echo_algorithm/EchoAlgoNodeProcess.js";
import { SnapshotDataWorker } from "../domain_layer/components/simulation/worker/SnapshotWorker.js";
import { EntityStateObserver, MessageStateObserver, NodeProcessLogObserver, NodeStateObserver } from "../domain_layer/components/simulation/presenter/SimSnapshotObserver.js";
import { NodeState } from "../domain_layer/components/algorithm_plugins/api/entities/state_entities/Nodes.js";
import { ISimulationEngine, SimulationEngine } from "../domain_layer/components/simulation/engine/SimulationEngine.js";


// Setup Simulation Context
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

// Init Simulation Context
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


//? Dummy Setup Entity Observer
const updates: Set<number> = new Set<number>();
const obsLogs: NodeProcessLogObserver = new EntityStateObserver<NodeProcessLog>(updates);
const obsNodes: NodeStateObserver = new EntityStateObserver<NodeState>(updates);
const obsMsgs: MessageStateObserver = new EntityStateObserver<MessageState>(updates);

// Setup SimulationEngine
const engine: ISimulationEngine = new SimulationEngine<EchoAlgorithmNodeState>(
    snapshot,
    new SnapshotDataWorker(), new EchoAlgorithmNodeProcess(),
    obsLogs, obsNodes, obsMsgs
);

//? Dummy Execution
engine.simulateInitiation(0);
engine.simulateTimeAdvancement(0);

while (snapshot.pendingMessages.length > 0) {
    engine.simulateTimeAdvancement(25);
}

console.log(snapshot.nodeStates);
console.log(snapshot.logs);