import { IMessageActionHandler } from "../../algorithm/actions/ActionHandler.js";
import { GenericMessage } from "../../algorithm/data/AlgoData.js";
import { IdentifiableStore, Identifiable } from "../../common/EntityStores.js";

export interface Neighbor {
    id: number,
    distance_ms: number,
}

export type NeighborStore = IdentifiableStore<Neighbor>

export class MessageSystem implements IMessageActionHandler {

    constructor(
        private neighbors: NeighborStore,

        private simulationTime: number,
        private sendMessage: (msg: GenericMessage) => void,
    ) { }

    //! todo should algo catch this error? 
    // full sim does not need to crash just because 
    // node cant send msg?
    // what would happen irl
    /**
     * 
     * @param msg 
     * @param receiver 
     * @throws {IdentifiableError} if giveb edge does not exist. RealWorld Analogy: tcp handshake neccessary
     */
    public send(msg: unknown, receiver: Identifiable): void {
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

}