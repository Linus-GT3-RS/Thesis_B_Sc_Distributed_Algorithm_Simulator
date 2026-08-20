import { ISystemLogging, ISystemOutgoingMessages, ISystemLocalData } from "../../simulation/algorithm_plugin_api/actions/ActionHandler.js";
import { AlgorithmExecutionError, GenericNodeProcess } from "../../simulation/algorithm_plugin_api/algorithm/AlgorithmProtocol.js";
import { GenericMessageData } from "../../simulation/algorithm_plugin_api/entities/state_entities/AlgoData.js";
import { EchoAlgorithmNode, InfoData as InfoMsgData, EchoData as EchoMsgData } from "./EchoAlgoData.js";

type EchoNode = EchoAlgorithmNode;

export class EchoAlgoNodeProcess
    extends GenericNodeProcess<EchoNode> {

    constructor(
        logSystem: ISystemLogging,
        comSystem: ISystemOutgoingMessages,
        nodeSystem: ISystemLocalData<EchoNode>,
    ) {
        super(logSystem, comSystem, nodeSystem);
    }


    public onInitiation(): void {
        // update node
        this.nodeSystem.set("isInitiator", true);
        this.nodeSystem.set("isInformed", true);

        // inform neighbors
        for (const neighbor of this.comSystem.getNeighbors()) {
            const msg: InfoMsgData =
                new InfoMsgData(this.nodeSystem.get("id"));
            this.comSystem.send(msg, neighbor);
        }
    }

    //todo maybe find cleaner solution?
    public onMessage(msgData: Readonly<GenericMessageData>): void {
        // sanity check msg data
        if (msgData instanceof InfoMsgData) {
            this.onInfoMessage(msgData);
        }
        else if (msgData instanceof EchoMsgData) {
            this.onEchoMessage();
        }
        else {
            throw new AlgorithmExecutionError(
                `Received unknown MessageData type ${msgData.type} when 
                trying to exec MessageProtocol.`
            );
        }
    }

    private onInfoMessage(
        msg: Readonly<InfoMsgData>,
    ): void {
        this.nodeSystem.set("numberInformedNeighbors",
            this.nodeSystem.get("numberInformedNeighbors") + 1
        );

        // handle first contact
        if (!this.nodeSystem.get("isInformed")) {
            this.nodeSystem.set("isInformed", true);
            const parentId: number = msg.senderID;
            this.nodeSystem.set("parentID", parentId);

            // inform all neighbors except parent
            for (const neighbor of this.comSystem.getNeighbors()) {
                if (neighbor.id != parentId) {

                    const infoMsgData: InfoMsgData =
                        new InfoMsgData(this.nodeSystem.get("id"));
                    this.comSystem.send(
                        infoMsgData, neighbor
                    );
                }
            }
        }

        if (this.allNeighborsInformed()) {
            this.onAllNeighborsInformed();
        }
    }


    private onEchoMessage(): void {
        this.nodeSystem.set("numberInformedNeighbors",
            this.nodeSystem.get("numberInformedNeighbors") + 1
        );

        if (this.allNeighborsInformed()) {
            this.onAllNeighborsInformed();
        }
    }


    /**
     * handles reaction of node if all
     * its neighbors are informed
     */
    private onAllNeighborsInformed(): void {
        // if initator
        if (this.nodeSystem.get("isInitiator")) {
            this.logSystem.log("Algorithm run finished");
            return;
        }

        // else send echo
        this.comSystem.send(new EchoMsgData(),
            { id: this.nodeSystem.get("parentID")! }
        )
    }

    private allNeighborsInformed(): boolean {
        return this.nodeSystem.get("numberInformedNeighbors")
            >= this.comSystem.getNeighborCount();
    }


}




