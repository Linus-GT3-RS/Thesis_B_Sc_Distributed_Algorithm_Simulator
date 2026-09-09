import { CreatedEdgeStateEv, CreatedMessageStateEv, CreatedNodeLogEv, CreatedNodeStateEv, ErrorEv, EventMessage, UpdatedEdgeStateEv, UpdatedNodeStateEv } from "./Events.js";


export abstract class IDomainEventGateway {

    /**
     * Events validated as legal DomainEvent can 
     * be emitted and thereby leave the domain
     * through this gateway.
     * 
     * Emits an ErrorEv if illegal
     * event is found
     * 
     * @param ev 
     */
    public abstract emit(ev: unknown): void;

}

export class DomainEventGateway implements IDomainEventGateway {

    constructor(
        private sendEventMessage: (msg: EventMessage) => void,
    ) { }

    public emit(ev: unknown): void {
        if (ev instanceof ErrorEv) {
            this.sendEventMessage({
                type: "ErrorEv",
                event: ev
            });
        }
        else if (ev instanceof CreatedNodeLogEv) {
            this.sendEventMessage({
                type: "CreatedNodeLogEv",
                event: ev,
            })
        }
        else if (ev instanceof CreatedNodeStateEv) {
            this.sendEventMessage({
                type: "CreatedNodeStateEv",
                event: ev,
            });
        }
        else if (ev instanceof UpdatedNodeStateEv) {
            this.sendEventMessage({
                type: "UpdatedNodeStateEv",
                event: ev,
            });
        }
        else if (ev instanceof CreatedMessageStateEv) {
            this.sendEventMessage({
                type: "CreatedMessageStateEv",
                event: ev,
            });
        }
        else if (ev instanceof CreatedEdgeStateEv) {
            this.sendEventMessage({
                type: "CreatedEdgeStateEv",
                event: ev,
            });
        }
        else if (ev instanceof UpdatedEdgeStateEv) {
            this.sendEventMessage({
                type: "UpdatedEdgeStateEv",
                event: ev,
            });
        }
        else {
            this.emit(new ErrorEv(
                `Cannot let event pass through DomainEventGateway.
                Received event is: ${ev}`
            ));
        }
    }

}