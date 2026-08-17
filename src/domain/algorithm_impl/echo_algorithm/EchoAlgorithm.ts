import { IAlgorithmActionScheduler } from "../../algorithm/actions/ActionHandler.js";
import { SendMessageAction, DoLogAction, UpdateNodeAction } from "../../algorithm/actions/Actions.js";
import { GenericAlgorithm, InvalidAlgorithmState as InvalidAlgorithmStateError, UnsupportedNodeTypeError as InvalidEntityError } from "../../algorithm/algorithm/Algorithm.js";
import { GenericNode } from "../../algorithm/data/AlgoData.js";
import { EchoAlgorithmNode, InfoMessageData, EchoMessageData } from "./EchoAlgoData.js";


export class EchoAlgorithm
    extends GenericAlgorithm {

    constructor(
        actionHandler: IAlgorithmActionScheduler,
    ) {
        super(actionHandler);
    }


    //* Wrapper

    public override issueInitiation(
        roInitiator: Readonly<GenericNode>,
        neighborIDs: ReadonlyArray<number>,
    ): void {
        // sanity check
        if (!(roInitiator instanceof EchoAlgorithmNode)) {
            throw new InvalidEntityError(`
                Received unknown Node type when trying to exec InitProtocol. 
                InvalidEntity node is ${roInitiator}`
            );
        }

        const initiator: EchoAlgorithmNode = this.copyNode(roInitiator);
        this.execProtocolOnInitiation(initiator, neighborIDs);
    }


    public override issueIncomingMessage(
        roReceiver: Readonly<GenericNode>,
        msgData: Readonly<unknown>,
        neighborIDs: ReadonlyArray<number>,
    ): void {
        // sanity check node data
        if (!(roReceiver instanceof EchoAlgorithmNode)) {
            throw new InvalidEntityError(`
                Received unknown receiver Node type when trying to exec MsgProtocol. 
                InvalidEntity is ${roReceiver}`
            );
        }
        const receiver: EchoAlgorithmNode = this.copyNode(roReceiver);

        // sanity check msg data
        if (msgData instanceof InfoMessageData) {
            this.execProtocolOnInfoMsg(receiver, msgData, neighborIDs);
        }
        else if (msgData instanceof EchoMessageData) {
            this.execProtoclOnEchoMsg(receiver, neighborIDs);
        }
        else {
            throw new InvalidEntityError(
                `Received unknown MessageData type when trying to exec MsgProtol.
                InvalidEntity is ${msgData}`
            );
        }
    }



    //* Algorithm Protocol

    private execProtocolOnInitiation(
        initiator: EchoAlgorithmNode,
        neighborIDs: ReadonlyArray<number>,
    ): void {
        // update node
        initiator.isInitiator = true;
        initiator.isInformed = true;
        this.actionHandler.scheduleAction(
            new UpdateNodeAction(initiator)
        );

        // inform neighbors
        for (const neighborId of neighborIDs) {
            const infoMsgData: InfoMessageData = new InfoMessageData(initiator.id);
            this.actionHandler.scheduleAction(
                new SendMessageAction(neighborId, infoMsgData)
            );
        }
    }

    private execProtocolOnInfoMsg(
        activeNode: EchoAlgorithmNode,
        msg: Readonly<InfoMessageData>,
        neighborIDs: ReadonlyArray<number>,
    ): void {
        activeNode.numberInformedNeighbors++;

        // handle first contact
        if (!activeNode.isInformed) {
            activeNode.isInformed = true;
            activeNode.parentID = msg.senderID;

            // inform all neighbors except parent
            for (const neighborId of neighborIDs) {
                if (neighborId != activeNode.parentID) {
                    const infoMsgData: InfoMessageData = new InfoMessageData(activeNode.id);
                    this.actionHandler.scheduleAction(
                        new SendMessageAction(neighborId, infoMsgData)
                    );
                }
            }
        }
        this.actionHandler.scheduleAction(
            new UpdateNodeAction(activeNode)
        );

        if (activeNode.numberInformedNeighbors >= neighborIDs.length) {
            this.onAllNeighborsInformed(activeNode);
        }
    }


    private execProtoclOnEchoMsg(
        activeNode: EchoAlgorithmNode,
        neighborIDs: ReadonlyArray<number>,
    ): void {
        activeNode.numberInformedNeighbors++;
        this.actionHandler.scheduleAction(
            new UpdateNodeAction(activeNode)
        );

        if (activeNode.numberInformedNeighbors >= neighborIDs.length) {
            this.onAllNeighborsInformed(activeNode);
        }
    }


    private onAllNeighborsInformed(
        activeNode: EchoAlgorithmNode,
    ): void {
        if (activeNode.isInitiator) {
            this.actionHandler.scheduleAction(
                new DoLogAction("Algorithm is finished")
            );
            return;
        }

        // else send echo
        if (activeNode.parentID === null) { // Sanity check
            throw new InvalidAlgorithmStateError(
                `Error when trying to send echo message.
                ParentId is null of activeNode=${activeNode}`
            );
        }
        this.actionHandler.scheduleAction(
            new SendMessageAction(activeNode.parentID, new EchoMessageData())
        );
    }


    private copyNode(roNode: Readonly<EchoAlgorithmNode>): EchoAlgorithmNode {
        return new EchoAlgorithmNode(
            roNode.id, roNode.isInitiator, roNode.isInformed,
            roNode.numberInformedNeighbors,
            roNode.parentID
        );
    }

}




