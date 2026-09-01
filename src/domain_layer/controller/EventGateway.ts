import { ErrorEv, EventMessage } from "./gateway_data/Events.js";


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
        else {
            this.emit(new ErrorEv(
                `Cannot let event pass through DomainEventGateway.
                Received event is: ${ev}`
            ));
        }
    }

}