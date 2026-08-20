import { Identifiable } from "../../../../../common/EntityStores.js";
import { INodeProcess } from "../../api/entities/behaviour_entities/NodeProcess.js";
import { NodeProcessEnvironment } from "../../api/entities/behaviour_entities/NodeProcessEnv.js";
import { MessageData } from "../../api/entities/state_entities/Messages.js";
import { EchoAlgorithmNodeState, EchoData, InfoData } from "./EchoAlgoEntities.js";

/**
 * Runs Echo Algorithm Protocol
 */
export class EchoAlgorithmNodeProcess
    implements INodeProcess<EchoAlgorithmNodeState> {

    public onInitiationInstruction(
        env: NodeProcessEnvironment<EchoAlgorithmNodeState>
    ): void {
        // update node
        env.local.set("isInitiator", true);
        env.local.set("isInformed", true);

        // inform neighbors
        for (const neighbor of env.out.getNeighborList()) {
            const msg: InfoData =
                new InfoData({ id: env.local.get("id") });
            env.out.send(msg, neighbor);
        }
    }


    public onIncomingMessage(
        env: NodeProcessEnvironment<EchoAlgorithmNodeState>
    ): void {
        const msg: Readonly<MessageData> = env.in.peekPendingMessage();

        // check if msg can be handled
        if (msg instanceof InfoData) {
            this.onInfoMessage(msg, env);
        }
        else if (msg instanceof EchoData) {
            this.onEchoMessage(env);
        }
        else { // cannot handle message
            env.up.logWarning(
                `Received unknown message of type ${msg.type}`
            );
        }
    }

    private onInfoMessage(
        msg: InfoData,
        env: NodeProcessEnvironment<EchoAlgorithmNodeState>
    ): void {
        env.local.set("numberInformedNeighbors",
            env.local.get("numberInformedNeighbors") + 1
        );

        // handle first contact
        if (!env.local.get("isInformed")) {
            env.local.set("isInformed", true);

            const parent: Identifiable = msg.senderID;
            env.local.set("parentID", parent);

            // inform all neighbors except parent
            for (const neighbor of env.out.getNeighborList()) {
                if (neighbor.id != parent.id) {

                    const infoMsgData: InfoData =
                        new InfoData({ id: env.local.get("id") });
                    env.out.send(
                        infoMsgData, neighbor
                    );
                }
            }
        }

        if (this.allNeighborsInformed(env)) {
            this.handleAllNeighborsInformed(env);
        }
    }

    private onEchoMessage(
        env: NodeProcessEnvironment<EchoAlgorithmNodeState>
    ): void {
        env.local.set("numberInformedNeighbors",
            env.local.get("numberInformedNeighbors") + 1
        );

        if (this.allNeighborsInformed(env)) {
            this.handleAllNeighborsInformed(env);
        }
    }

    /**
     * Validates if all neighbors are informed
     */
    private allNeighborsInformed(
        env: NodeProcessEnvironment<EchoAlgorithmNodeState>
    ): boolean {
        return env.local.get("numberInformedNeighbors")
            >= env.out.getNeighborCount();
    }

    /**
     * handles reaction of node process if all
     * neighbors are informed
     */
    private handleAllNeighborsInformed(
        env: NodeProcessEnvironment<EchoAlgorithmNodeState>
    ): void {
        // if initator
        if (env.local.get("isInitiator")) {
            env.up.logInfo("Algorithm run finished");
            return;
        }

        // else send echo
        const parent: Readonly<Identifiable> | null =
            env.local.get("parentID");
        if (parent !== null) {
            env.out.send(new EchoData(), parent);
        }
        else { // node is in invalid state somehow
            env.up.logError(
                `Error when trying to send EchoMessage 
                from Node with id=${env.local.get("id")}, 
                because id of parent is null.`
            );
        }
    }

}

