import { IAlgorithmActionHandler } from "../../algorithm/actions/ActionHandler";
import { CreateMessageAction, LogAction, UpdateNodeAction } from "../../algorithm/actions/Actions";
import { GenericAlgorithm } from "../../algorithm/Algorithm";
import { GenericNode } from "../../algorithm/data/Data";
import { EchoAlgorithmNode, InfoMessageData, EchoMessageData } from "./EchoAlgoData";

//! todo readonly

export class EchoAlgorithm
    extends GenericAlgorithm {

    constructor(
        actionHandler: IAlgorithmActionHandler,
    ) {
        super(actionHandler);
    }


    //* Message Handle

    public override onMessageDelivery(
        receiver: GenericNode, // todo is a copy?
        msgData: unknown,
        neighborIDs: Array<number>,
    ): void {
        if (receiver instanceof EchoAlgorithmNode) {
            if (msgData instanceof InfoMessageData) {
                return this.onInfoMsg(receiver, msgData, neighborIDs);
            }
            else if (msgData instanceof EchoMessageData) {
                return this.onEchoMsg(receiver, neighborIDs);
            }
        }
        throw new Error(); // todo
    }


    private onInfoMsg(
        receiver: EchoAlgorithmNode,
        msg: InfoMessageData,
        neighborIDs: Array<number>,
    ): void {
        receiver.numberInformedNeighbors++;

        if (!receiver.isInformed) {
            receiver.parentID = msg.senderID;

            for (const neighbor of neighborIDs) {
                if (neighbor != receiver.parentID) {

                    const infoMsgData: InfoMessageData = new InfoMessageData(receiver.id);
                    this.actionHandler.handleAction(
                        new CreateMessageAction(neighbor, msg)
                    );
                }
            }
        }

        if (receiver.numberInformedNeighbors >= neighborIDs.length) {
            this.onAllNeighborsInformed(receiver);
        }

        this.actionHandler.handleAction(
            new UpdateNodeAction(receiver) // todo
        );
    }


    private onEchoMsg(
        receiver: EchoAlgorithmNode,
        neighborIDs: Array<number>,
    ): void {
        receiver.numberInformedNeighbors++;

        if (receiver.numberInformedNeighbors >= neighborIDs.length) {
            this.onAllNeighborsInformed(receiver);
        }

        this.actionHandler.handleAction(
            new UpdateNodeAction(receiver) // todo
        );
    }


    private onAllNeighborsInformed(
        receiver: EchoAlgorithmNode,
    ): void {
        if (receiver.isInitiator) {
            this.actionHandler.handleAction(
                new LogAction("Algorithm is finished: Result is ...") // todo
            );
            return;
        }

        const echoMsgData: EchoMessageData = new EchoMessageData();
        this.actionHandler.handleAction(
            // todo null check
            new CreateMessageAction(receiver.parentID!, echoMsgData)
        );
    }


    //* Initiation Handle

    public override onInitiationRequest(
        initiator: GenericNode, // todo is a copy?
        neighborIDs: Array<number>,
    ): void {
        if (initiator instanceof EchoAlgorithmNode) {
            this.handleInitRequest(initiator, neighborIDs);
        }
        throw new Error(); // todo
    }

    private handleInitRequest(
        initiator: EchoAlgorithmNode,
        neighborIDs: Array<number>,
    ): void {
        initiator.isInitiator = true;
        initiator.isInformed = true;

        this.actionHandler.handleAction(
            new UpdateNodeAction(initiator) // todo
        );

        for (const neighbor of neighborIDs) {
            const msg: InfoMessageData = new InfoMessageData(initiator.id);

            this.actionHandler.handleAction(
                new CreateMessageAction(neighbor, msg)
            );
        }
    }

}




