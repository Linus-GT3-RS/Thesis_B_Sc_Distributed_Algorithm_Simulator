import { IAlgorithmActionHandler } from "../../algorithm/actions/ActionHandler.js";
import { SendMessageAction, DoLogAction } from "../../algorithm/actions/Actions.js";
import { GenericAlgorithm, UnsupportedNodeTypeError as InvalidEntityError } from "../../algorithm/algorithm/Algorithm.js";
import { GenericNode } from "../../algorithm/data/AlgoData.js";
import { EchoAlgorithmNode, InfoMessageData, EchoMessageData } from "./EchoAlgoData.js";


export class EchoAlgorithm
    extends GenericAlgorithm {

    constructor(
        actionHandler: IAlgorithmActionHandler,
    ) {
        super(actionHandler);
    }


    //* Message Handle

    public override execProtocolOnMessage(
        receiver: Readonly<GenericNode>,
        msgData: Readonly<unknown>,
        neighborIDs: ReadonlyArray<number>,
    ): void {
        // sanity check node data
        if (!(receiver instanceof EchoAlgorithmNode)) {
            throw new InvalidEntityError(`
                Received unknown receiver Node type when trying to exec MsgProtocol. 
                InvalidEntity is ${receiver}`
            );
        }

        // sanity check msg data
        if (msgData instanceof InfoMessageData) {
            this.onInfoMsg(receiver, msgData, neighborIDs);
        }
        else if (msgData instanceof EchoMessageData) {
            this.onEchoMsg(receiver, neighborIDs);
        }
        else {
            throw new InvalidEntityError(
                `Received unknown MessageData type when trying to exec MsgProtol.
                InvalidEntity is ${msgData}`
            );
        }
    }

    //* Message Protocol

    //! todo

    private onInfoMsg(
        roReceiver: Readonly<EchoAlgorithmNode>,
        msg: Readonly<InfoMessageData>,
        neighborIDs: ReadonlyArray<number>,
    ): void {
        roReceiver.numberInformedNeighbors++;

        if (!roReceiver.isInformed) {
            roReceiver.isInformed = true;
            roReceiver.parentID = msg.senderID;

            for (const neighborId of neighborIDs) {
                if (neighborId != roReceiver.parentID) {

                    const infoMsgData: InfoMessageData = new InfoMessageData(roReceiver.id);
                    this.actionHandler.handleAction(
                        new SendMessageAction(roReceiver.id, neighborId, infoMsgData)
                    );
                }
            }
        }

        if (roReceiver.numberInformedNeighbors >= neighborIDs.length) {
            this.onAllNeighborsInformed(roReceiver);
        }

        this.actionHandler.handleAction(
            new UpdateNodePropertiesAction(roReceiver) // todo
        );
    }


    private onEchoMsg(
        roReceiver: Readonly<EchoAlgorithmNode>,
        neighborIDs: ReadonlyArray<number>,
    ): void {
        roReceiver.numberInformedNeighbors++;

        if (roReceiver.numberInformedNeighbors >= neighborIDs.length) {
            this.onAllNeighborsInformed(roReceiver);
        }

        this.actionHandler.handleAction(
            new UpdateNodePropertiesAction(roReceiver) // todo
        );
    }


    private onAllNeighborsInformed(
        receiver: EchoAlgorithmNode,
    ): void {
        if (receiver.isInitiator) {
            this.actionHandler.handleAction(
                new DoLogAction("Algorithm is finished: Result is ...") // todo
            );
            return;
        }

        const echoMsgData: EchoMessageData = new EchoMessageData();
        this.actionHandler.handleAction(
            // todo null check
            new SendMessageAction(receiver.id, receiver.parentID!, echoMsgData)
        );
    }


    //* Initiation Handle

    public override execProtocolOnInitiation(
        initiator: Readonly<GenericNode>,
        neighborIDs: ReadonlyArray<number>,
    ): void {
        // sanity check
        if (!(initiator instanceof EchoAlgorithmNode)) {
            throw new InvalidEntityError(`
                Received unknown Node type when trying to exec InitProtocol. 
                InvalidEntity node is ${initiator}`
            );
        }
        this.handleInitiation(initiator, neighborIDs);
    }

    //* Initiation Protocol

    //! todo catch errors here? or just doc via catch rethrow?
    // s. in ActionHandler.ts

    private handleInitiation(
        roInitiator: Readonly<EchoAlgorithmNode>,
        neighborIDs: ReadonlyArray<number>,
    ): void {
        const initiator: EchoAlgorithmNode = this.copyNode(roInitiator);

        // update node
        initiator.isInitiator = true;
        initiator.isInformed = true;
        this.actionHandler.issueUpdateNodeAct(
            new UpdateNodePropertiesAction(initiator)
        );

        // inform neighbors
        for (const neighborId of neighborIDs) {
            const infoMsgData: InfoMessageData = new InfoMessageData(initiator.id);
            this.actionHandler.issueSendMessageAct(
                new SendMessageAction(initiator.id, neighborId, infoMsgData)
            );
        }
    }







    private copyNode(roNode: Readonly<EchoAlgorithmNode>): EchoAlgorithmNode {
        return new EchoAlgorithmNode(
            roNode.id, roNode.isInitiator, roNode.isInformed,
            roNode.numberInformedNeighbors,
            roNode.parentID
        );
    }

}




