import TinyQueue from "tinyqueue";
import { IndexedStore } from "../common/EntityStores.js";
import { BiDirectionalEdgeState } from "../domain_layer/components/algorithm_plugins/plugin_api/entities/state_entities/Edges.js";
import { NodeLog } from "../domain_layer/components/algorithm_plugins/plugin_api/entities/state_entities/Logs.js";
import { MessageState } from "../domain_layer/components/algorithm_plugins/plugin_api/entities/state_entities/Messages.js";
import { EchoAlgorithmNodeState } from "../domain_layer/components/algorithm_plugins/plugins/echo_algorithm/data/EchoAlgoEntities.js";
import type { PendingMessage } from "@/domain_layer/components/simulation/data/SimulationSnapshot.js";
import { SimulationSnapshot } from "@/domain_layer/components/simulation/data/SimulationSnapshot.js";

function buildEmptySnapshot(): SimulationSnapshot<EchoAlgorithmNodeState> {
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

    return snapshot;
}

export function buildGraph5(): SimulationSnapshot<EchoAlgorithmNodeState> {
    const snapshot = buildEmptySnapshot();

    snapshot.nodeStates.insert(new EchoAlgorithmNodeState(0, false, false, 0, null));
    snapshot.nodeStates.insert(new EchoAlgorithmNodeState(1, false, false, 0, null));
    snapshot.nodeStates.insert(new EchoAlgorithmNodeState(2, false, false, 0, null));
    snapshot.nodeStates.insert(new EchoAlgorithmNodeState(3, false, false, 0, null));
    snapshot.nodeStates.insert(new EchoAlgorithmNodeState(4, false, false, 0, null));

    snapshot.edgeStates.insert(new BiDirectionalEdgeState(0, { id: 0 }, { id: 1 }, 100));
    snapshot.edgeStates.insert(new BiDirectionalEdgeState(1, { id: 0 }, { id: 2 }, 110));
    snapshot.edgeStates.insert(new BiDirectionalEdgeState(2, { id: 2 }, { id: 3 }, 120));
    snapshot.edgeStates.insert(new BiDirectionalEdgeState(3, { id: 2 }, { id: 4 }, 130));
    snapshot.edgeStates.insert(new BiDirectionalEdgeState(4, { id: 1 }, { id: 4 }, 140));

    return snapshot;
}


export function buildGraph10(): SimulationSnapshot<EchoAlgorithmNodeState> {
    const snapshot = buildEmptySnapshot();

    snapshot.nodeStates.insert(new EchoAlgorithmNodeState(0, false, false, 0, null));
    snapshot.nodeStates.insert(new EchoAlgorithmNodeState(1, false, false, 0, null));
    snapshot.nodeStates.insert(new EchoAlgorithmNodeState(2, false, false, 0, null));
    snapshot.nodeStates.insert(new EchoAlgorithmNodeState(3, false, false, 0, null));
    snapshot.nodeStates.insert(new EchoAlgorithmNodeState(4, false, false, 0, null));

    snapshot.nodeStates.insert(new EchoAlgorithmNodeState(5, false, false, 0, null));
    snapshot.nodeStates.insert(new EchoAlgorithmNodeState(6, false, false, 0, null));
    snapshot.nodeStates.insert(new EchoAlgorithmNodeState(7, false, false, 0, null));
    snapshot.nodeStates.insert(new EchoAlgorithmNodeState(8, false, false, 0, null));
    snapshot.nodeStates.insert(new EchoAlgorithmNodeState(9, false, false, 0, null));

    snapshot.edgeStates.insert(new BiDirectionalEdgeState(snapshot.edgeStates.size(), { id: 0 }, { id: 1 }, 100));
    snapshot.edgeStates.insert(new BiDirectionalEdgeState(snapshot.edgeStates.size(), { id: 0 }, { id: 2 }, 110));
    snapshot.edgeStates.insert(new BiDirectionalEdgeState(snapshot.edgeStates.size(), { id: 2 }, { id: 3 }, 120));
    snapshot.edgeStates.insert(new BiDirectionalEdgeState(snapshot.edgeStates.size(), { id: 2 }, { id: 4 }, 130));
    snapshot.edgeStates.insert(new BiDirectionalEdgeState(snapshot.edgeStates.size(), { id: 1 }, { id: 4 }, 140));
    snapshot.edgeStates.insert(new BiDirectionalEdgeState(snapshot.edgeStates.size(), { id: 5 }, { id: 3 }, 40));
    snapshot.edgeStates.insert(new BiDirectionalEdgeState(snapshot.edgeStates.size(), { id: 5 }, { id: 6 }, 140));
    snapshot.edgeStates.insert(new BiDirectionalEdgeState(snapshot.edgeStates.size(), { id: 6 }, { id: 7 }, 140));
    snapshot.edgeStates.insert(new BiDirectionalEdgeState(snapshot.edgeStates.size(), { id: 1 }, { id: 8 }, 140));
    snapshot.edgeStates.insert(new BiDirectionalEdgeState(snapshot.edgeStates.size(), { id: 2 }, { id: 9 }, 140));
    snapshot.edgeStates.insert(new BiDirectionalEdgeState(snapshot.edgeStates.size(), { id: 4 }, { id: 9 }, 140));

    return snapshot;
}