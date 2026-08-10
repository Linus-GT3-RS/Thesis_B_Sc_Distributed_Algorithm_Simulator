import { IAlgorithmActionHandler } from "../../algorithm/actions/ActionHandler.js";
import { CreateMessageAction, LogAction, UpdateNodeAction } from "../../algorithm/actions/Actions.js";
import { GenericAlgorithm, UnsupportedMessageTypeError, UnsupportedNodeTypeError } from "../../algorithm/algorithm/Algorithm.js";
import { GenericNode } from "../../algorithm/data/AlgoData.js";
import { EchoAlgorithmNode, InfoMessageData, EchoMessageData } from "./EchoAlgoData.js";

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
        if (!(receiver instanceof EchoAlgorithmNode)) {
            throw new UnsupportedNodeTypeError(); // todo msg
        }

        if (msgData instanceof InfoMessageData) {
            this.onInfoMsg(receiver, msgData, neighborIDs);
        }
        else if (msgData instanceof EchoMessageData) {
            this.onEchoMsg(receiver, neighborIDs);
        }
        else {
            throw new UnsupportedMessageTypeError(); // todo msg
        }
    }


    private onInfoMsg(
        receiver: EchoAlgorithmNode,
        msg: InfoMessageData,
        neighborIDs: Array<number>,
    ): void {
        receiver.numberInformedNeighbors++;

        if (!receiver.isInformed) {
            receiver.parentID = msg.senderID;

            for (const neighborId of neighborIDs) {
                if (neighborId != receiver.parentID) {

                    const infoMsgData: InfoMessageData = new InfoMessageData(receiver.id);
                    this.actionHandler.handleAction(
                        new CreateMessageAction(receiver.id, neighborId, msg)
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
            new CreateMessageAction(receiver.id, receiver.parentID!, echoMsgData)
        );
    }


    //* Initiation Handle

    public override onInitiationRequest(
        initiator: GenericNode, // todo is a copy?
        neighborIDs: Array<number>,
    ): void {
        if (!(initiator instanceof EchoAlgorithmNode)) {
            throw new UnsupportedNodeTypeError(); // todo msg
        }
        this.handleInitRequest(initiator, neighborIDs);
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

        for (const neighborId of neighborIDs) {
            const msg: InfoMessageData = new InfoMessageData(initiator.id);

            this.actionHandler.handleAction(
                new CreateMessageAction(initiator.id, neighborId, msg)
            );
        }
    }

}




