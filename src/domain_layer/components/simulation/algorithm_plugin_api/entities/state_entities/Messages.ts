import { Identifiable } from "../../../../../../common/EntityStores.js";
import { MilisecsSinceEpoch } from "../../../../../../common/Time.js";

export class MessageData {
    constructor(
        public type: string,
    ) { }
}

export class MessageState {
    constructor(
        public id: number,
        public receiverNode: Identifiable,
        public destinationTime: MilisecsSinceEpoch,
        public data: MessageData,
    ) { }
}

export interface PendingMessage {
    id: number,
    destinationTime: number
}