import TinyQueue from "tinyqueue";
import { IndexedStore } from "../../src/common/EntityStores.js";
import { BiDirectionalEdgeState } from "../../src/domain_layer/components/algorithm_plugins/api/entities/state_entities/Edges.js";
import { NodeProcessLog } from "../../src/domain_layer/components/algorithm_plugins/api/entities/state_entities/Logs.js";
import { MessageState } from "../../src/domain_layer/components/algorithm_plugins/api/entities/state_entities/Messages.js";
import { EchoAlgorithmNodeState } from "../../src/domain_layer/components/algorithm_plugins/plugins/echo_algorithm/EchoAlgoEntities.js";
import { PendingMessage, SimulationSnapshot } from "../../src/domain_layer/components/simulation/SimulationSnapshot.js";
import { ISimulationEngine, SimEng } from "../../src/domain_layer/components/simulation/engine/SimulationEngine.js";
import { EchoAlgorithmNodeProcess } from "../../src/domain_layer/components/algorithm_plugins/plugins/echo_algorithm/EchoAlgoNodeProcess.js";
import { SnapshotDataWorker } from "../domain_layer/components/simulation/worker/SnapshotWorker.js";

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


// Setup Simulation Context
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


// Setup SimulationEngine
const engine: ISimulationEngine = new SimEng<EchoAlgorithmNodeState>(
    snapshot, new EchoAlgorithmNodeProcess(), new SnapshotDataWorker()
);


// Init Simulation
engine.handleInitiation(0);

// Step Simulation
while (snapshot.pendingMessages.length > 0) {
    snapshot.simulationTimestamp += 25;
    engine.handlePendingMessages();
}

console.log(snapshot.nodeStates);
console.log(snapshot.logs);