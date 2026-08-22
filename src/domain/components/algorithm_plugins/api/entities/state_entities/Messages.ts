import type { Identifiable } from "@/common/EntityStores";

export class MessageData {
    constructor(
        public type: string,
    ) { }
}

export class MessageState {
    constructor(
        public id: number,
        public receiverNode: Identifiable,
        public destinationTime: number,
        public data: MessageData,
    ) { }
}