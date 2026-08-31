import type { IndexedStore } from "@/common/EntityStores";

export class NodeLogViewModel {
    constructor(
        public id: number,
        public logType: string,
        public timestamp: number,
        public node: number,
        public log: string
    ) { }
}
export type NodeLogViewMStore = IndexedStore<NodeLogViewModel>

export class MessageViewModel {
    constructor(
        public id: number,
        public type: string,
        public destinationTime: number,
        public sendTime: number,
        public sender: number,
        public receiver: number,
    ) { }
}
export type MessageViewMStore = IndexedStore<MessageViewModel>


export class NodeViewModel {
    constructor(
        public id: number,
        public isThick: boolean,
        public color: string
    ) { }
}
export type NodeViewMStore = IndexedStore<NodeViewModel>


export class EdgeViewModel {
    constructor(
        public id: number,
        public nodeA: number,
        public nodeB: number,
        public length_ms: number,
        public isThick: boolean,
    ) { }
} export type EdgeViewMStore = IndexedStore<EdgeViewModel>