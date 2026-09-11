import { SchemaErrorEv, SchemaEvCreatedEdgeState, SchemaEvCreatedMessageState, SchemaEvCreatedNodeLog, SchemaEvCreatedNodeState, SchemaEvUpdatedEdgeState, SchemaEvUpdatedNodeState, type TypeErrorEv, type TypeEvCreatedNodeLog, type TypeEvCreatedNodeState, type TypeEvUpdatedNodeState, type TypeEvCreatedMessageState, type TypeEvCreatedEdgeState, type TypeEvUpdatedEdgeState, type EventMessage, SchemaEventMessage } from "@/domain_layer/gateways/Events";
import z from "zod";

export class UIEventGateway {

    constructor(
        private handleEvErrorEv: (ev: TypeErrorEv) => void,
        private handleEvCreatedNodeLog: (ev: TypeEvCreatedNodeLog) => void,
        private handleEvCreatedNodeState: (ev: TypeEvCreatedNodeState) => void,
        private handleEvUpdatedNodeState: (ev: TypeEvUpdatedNodeState) => void,
        private handleEvCreatedMessageState: (ev: TypeEvCreatedMessageState) => void,
        private handleEvCreatedEdgeState: (ev: TypeEvCreatedEdgeState) => void,
        private handleEvUpdatedEdgeState: (ev: TypeEvUpdatedEdgeState) => void,
    ) { }

    /**
     * Gets a message from WorkerThread
     * and decodes it.
     * 
     * If it is a valid DomainEvent, the corresponding
     * EventHandler is called.
     *
     * In all other cases the invalid message gets logged
     */
    public onEventMessage(message: MessageEvent<any>): void {
        try {
            const eventmsg: EventMessage = SchemaEventMessage.parse(message.data);
            const evtype: string = eventmsg.type;
            const evpayload: unknown = eventmsg.event;

            //= Error Events
            if (evtype === "ErrorEv") {
                const ev: TypeErrorEv = SchemaErrorEv.parse(eventmsg.event);
                this.handleEvErrorEv(ev);
            }

            //= Entity Events
            else if (evtype === "CreatedNodeLogEv") {
                const ev: TypeEvCreatedNodeLog =
                    SchemaEvCreatedNodeLog.parse(evpayload);
                this.handleEvCreatedNodeLog(ev);
            }
            else if (evtype === "CreatedNodeStateEv") {
                const ev: TypeEvCreatedNodeState =
                    SchemaEvCreatedNodeState.parse(evpayload);
                this.handleEvCreatedNodeState(ev);
            }
            else if (evtype === "UpdatedNodeStateEv") {
                const ev: TypeEvUpdatedNodeState =
                    SchemaEvUpdatedNodeState.parse(evpayload);
                this.handleEvUpdatedNodeState(ev);
            }
            else if (evtype === "CreatedMessageStateEv") {
                const ev: TypeEvCreatedMessageState =
                    SchemaEvCreatedMessageState.parse(evpayload);
                this.handleEvCreatedMessageState(ev);
            }
            else if (evtype === "CreatedEdgeStateEv") {
                const ev: TypeEvCreatedEdgeState =
                    SchemaEvCreatedEdgeState.parse(evpayload);
                this.handleEvCreatedEdgeState(ev);
            }
            else if (evtype === "UpdatedEdgeStateEv") {
                const ev: TypeEvUpdatedEdgeState =
                    SchemaEvUpdatedEdgeState.parse(evpayload);
                this.handleEvUpdatedEdgeState(ev);
            }

            //= Catch all unknown Events
            else {
                this.onInvalidEventMessage(eventmsg);
            }
        }
        catch (error) {
            if (error instanceof z.ZodError) {
                this.onInvalidEventMessage(message);
            }
            else {
                throw error;
            }
        }
    }

    private onInvalidEventMessage(msg: unknown): void {
        console.log(`UI-EventGateway received unknown Message: ${msg}`);
    }

}