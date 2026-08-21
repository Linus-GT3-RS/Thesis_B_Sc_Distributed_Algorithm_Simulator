import TinyQueue from "tinyqueue";
import { IndexedStore } from "../../../common/EntityStores.js";
import { BiDirectionalEdgeState } from "../algorithm_plugins/api/entities/state_entities/Edges.js";
import { NodeLog } from "../algorithm_plugins/api/entities/state_entities/Logs.js";
import { MessageState } from "../algorithm_plugins/api/entities/state_entities/Messages.js";
import { NodeState } from "../algorithm_plugins/api/entities/state_entities/Nodes.js";

export type LogStore = IndexedStore<NodeLog>;
export type NodeStateStore<N extends NodeState> = IndexedStore<N>;
export type EdgeStateStore = IndexedStore<BiDirectionalEdgeState>;
export type MessageStateStore = IndexedStore<MessageState>;

export interface PendingMessage {
    id: number,
    destinationTime: number
}
export type MessageQueue = TinyQueue<Readonly<PendingMessage>>


export class SimulationSnapshot<N extends NodeState> {
    constructor(
        public logs: LogStore,

        public nodeStates: NodeStateStore<N>,
        public edgeStates: EdgeStateStore,

        public msgStates: MessageStateStore, // contains all msgs
        public pendingMessages: MessageQueue, // contains all pending msgs

        public simulationTimestamp: number,

        // public algoType: AlgorithmIdentifier,
    ) { }
}


