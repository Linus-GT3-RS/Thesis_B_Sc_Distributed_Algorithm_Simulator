import TinyQueue from "tinyqueue";
import { IndexedStore } from "../common/EntityStores.js";
import { BiDirectionalEdgeState } from "../domain_layer/components/algorithm_plugins/plugin_api/entities/state_entities/Edges.js";
import { NodeLog } from "../domain_layer/components/algorithm_plugins/plugin_api/entities/state_entities/Logs.js";
import { MessageState } from "../domain_layer/components/algorithm_plugins/plugin_api/entities/state_entities/Messages.js";
import { EchoAlgorithmNodeEntity } from "../domain_layer/components/algorithm_plugins/plugins/echo_algorithm/data/EchoAlgoEntities.js";
import type { PendingMessage } from "@/domain_layer/components/simulation/data/SimulationSnapshot.js";
import { SimulationSnapshot } from "@/domain_layer/components/simulation/data/SimulationSnapshot.js";

function buildEmptySnapshot(): SimulationSnapshot<EchoAlgorithmNodeEntity> {
    const logStore = new IndexedStore<NodeLog>();
    const nodeStore = new IndexedStore<EchoAlgorithmNodeEntity>();
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

export function buildGraph5(): SimulationSnapshot<EchoAlgorithmNodeEntity> {
    const snapshot = buildEmptySnapshot();

    snapshot.nodeStates.insert(new EchoAlgorithmNodeEntity(0, false, false, 0, null));
    snapshot.nodeStates.insert(new EchoAlgorithmNodeEntity(1, false, false, 0, null));
    snapshot.nodeStates.insert(new EchoAlgorithmNodeEntity(2, false, false, 0, null));
    snapshot.nodeStates.insert(new EchoAlgorithmNodeEntity(3, false, false, 0, null));
    snapshot.nodeStates.insert(new EchoAlgorithmNodeEntity(4, false, false, 0, null));

    snapshot.edgeStates.insert(new BiDirectionalEdgeState(0, { id: 0 }, { id: 1 }, 100));
    snapshot.edgeStates.insert(new BiDirectionalEdgeState(1, { id: 0 }, { id: 2 }, 110));
    snapshot.edgeStates.insert(new BiDirectionalEdgeState(2, { id: 2 }, { id: 3 }, 120));
    snapshot.edgeStates.insert(new BiDirectionalEdgeState(3, { id: 2 }, { id: 4 }, 130));
    snapshot.edgeStates.insert(new BiDirectionalEdgeState(4, { id: 1 }, { id: 4 }, 140));

    return snapshot;
}


export function buildGraph10(): SimulationSnapshot<EchoAlgorithmNodeEntity> {
    const snapshot = buildEmptySnapshot();

    snapshot.nodeStates.insert(new EchoAlgorithmNodeEntity(0, false, false, 0, null));
    snapshot.nodeStates.insert(new EchoAlgorithmNodeEntity(1, false, false, 0, null));
    snapshot.nodeStates.insert(new EchoAlgorithmNodeEntity(2, false, false, 0, null));
    snapshot.nodeStates.insert(new EchoAlgorithmNodeEntity(3, false, false, 0, null));
    snapshot.nodeStates.insert(new EchoAlgorithmNodeEntity(4, false, false, 0, null));

    snapshot.nodeStates.insert(new EchoAlgorithmNodeEntity(5, false, false, 0, null));
    snapshot.nodeStates.insert(new EchoAlgorithmNodeEntity(6, false, false, 0, null));
    snapshot.nodeStates.insert(new EchoAlgorithmNodeEntity(7, false, false, 0, null));
    snapshot.nodeStates.insert(new EchoAlgorithmNodeEntity(8, false, false, 0, null));
    snapshot.nodeStates.insert(new EchoAlgorithmNodeEntity(9, false, false, 0, null));

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