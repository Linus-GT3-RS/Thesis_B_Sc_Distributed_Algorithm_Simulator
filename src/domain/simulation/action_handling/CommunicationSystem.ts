import TinyQueue from "tinyqueue";
import { ISystemOutgoingMessages } from "../../algorithm/actions/ActionHandler.js";
import { GenericEdge, GenericMessage, GenericMessageData } from "../../algorithm/data/AlgoData.js";
import { IdentifiableStore, Identifiable, ReadonlyStore } from "../../common/EntityStores.js";
import { PendingMessage } from "../SimulationEngine.js";

export interface Neighbor {
    id: number,
    distance_ms: number,
}
export type NeighborStore = IdentifiableStore<Neighbor>


export class MessageReceiver {

}

export class MessageSender {

}



const coms: ComSystem;

export class CommunicationSystem implements ISystemOutgoingMessages {

    private incomingMessage: GenericMessage | null = null;

    constructor(
        private node: Identifiable,
        private edges: ReadonlyStore<GenericEdge>,
        // private neighbors: NeighborStore, // todo only created on first use

        isMessagePending: boolean,
        // private pendingMessage: Identifiable | null,

        private pendingMsgs: TinyQueue<PendingMessage>,
        private allMessages: IdentifiableStore<GenericMessage>,
    ) {
        if (isMessagePending) { // then deliver
            const p: PendingMessage = pendingMsgs.pop()

        }
    }

    /**
     * on initiation protocol there is no pending message
     * only on message protocol
     * 
     * calling this first time marks this message as delivered etc
     * each call after that just reads the same value for easy access
     * @throws {} if no message is pending
     */
    public getPendingMessage(): Readonly<GenericMessageData> {
        if (this.pendingMessage === null) {
            throw new Error("No message is pending");
        }

        if (!isDelivered) {
            // accept
            this.pendingMsgs.pop()
        }
        return

    }

    public send(msg: GenericMessageData, receiver: Identifiable): void {
        // sanity check edge exists
        const recipient: Neighbor = this.neighbors.peek(receiver);

        // enqueue message
        const message: GenericMessage = new GenericMessage(
            -1, // todo
            this.simulationTime + recipient.distance_ms,
            recipient,
            msg
        );
        this.sendMessage(message);
    }

    public getNeighbors(): MapIterator<Readonly<Identifiable>> {
        return this.neighbors.peekAllValues();
    }

    public getNeighborCount(): number {
        return this.neighbors.size();
    }

}