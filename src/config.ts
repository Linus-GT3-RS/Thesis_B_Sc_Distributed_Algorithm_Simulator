import TinyQueue from "tinyqueue";
import { IndexedStore } from "./common/EntityStores";
import { BiDirectionalEdgeState } from "./domain/components/algorithm_plugins/api/entities/state_entities/Edges";
import type { NodeLog } from "./domain/components/algorithm_plugins/api/entities/state_entities/Logs";
import type { MessageState } from "./domain/components/algorithm_plugins/api/entities/state_entities/Messages";
import { EchoAlgorithmNodeState } from "./domain/components/algorithm_plugins/plugins/echo_algorithm/EchoAlgoEntities";
import { EchoAlgorithmNodeProcess } from "./domain/components/algorithm_plugins/plugins/echo_algorithm/EchoAlgoNodeProcess";
import { ISimulationEngine, SimEng } from "./domain/components/simulation/engine/SimulationEngine";
import { type PendingMessage, SimulationSnapshot } from "./domain/components/simulation/SimulationSnapshot";
import { SimSnapshotDataWorker } from "./domain/components/simulation/worker/EntityWorker";
import { ref } from "vue";

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

export const refSnapshot = ref(new SimulationSnapshot(
    logStore, nodeStore, edgeStore, msgStore, pendingMsgs, 0
));


// Setup Simulation Context
nodeStore.insert(new EchoAlgorithmNodeState(0, false, false, 0, null));
nodeStore.insert(new EchoAlgorithmNodeState(1, false, false, 0, null));
nodeStore.insert(new EchoAlgorithmNodeState(2, false, false, 0, null));
nodeStore.insert(new EchoAlgorithmNodeState(3, false, false, 0, null));

edgeStore.insert(new BiDirectionalEdgeState(0, { id: 0 }, { id: 1 }, 100));
edgeStore.insert(new BiDirectionalEdgeState(1, { id: 0 }, { id: 2 }, 110));
edgeStore.insert(new BiDirectionalEdgeState(2, { id: 2 }, { id: 3 }, 120));
edgeStore.insert(new BiDirectionalEdgeState(3, { id: 1 }, { id: 3 }, 25));


// Setup SimulationEngine
export const engine: ISimulationEngine = new SimEng<EchoAlgorithmNodeState>(
    refSnapshot.value, new EchoAlgorithmNodeProcess(), new SimSnapshotDataWorker()
);


// // Init Simulation
// engine.handleInitiation(0);

// // Step Simulation
// while (snapshot.pendingMessages.length > 0) {
//     snapshot.simulationTimestamp += 25;
//     engine.handlePendingMessages();
// }

// console.log(snapshot.nodeStates);
// console.log(snapshot.logs);