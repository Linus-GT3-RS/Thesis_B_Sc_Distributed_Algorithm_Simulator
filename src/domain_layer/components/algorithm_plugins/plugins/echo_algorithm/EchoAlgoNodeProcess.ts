import type { Identifiable } from "../../../../../common/EntityStores.js";
import { INodeProcess } from "../../plugin_api/entities/behaviour_entities/NodeProcess.js";
import type { NodeProcessEnvironment } from "../../plugin_api/entities/behaviour_entities/NodeProcessEnv.js";
import { MessageData } from "../../plugin_api/entities/state_entities/Messages.js";
import { EchoAlgorithmNodeEntity, InfoMessageData, EchoMessageData } from "./data/EchoAlgoEntities.js";

/**
 * Runs Echo Algorithm Protocol
 */
export class EchoAlgorithmNodeProcess
    implements INodeProcess<EchoAlgorithmNodeEntity> {

    public onInitiationInstruction(
        env: NodeProcessEnvironment<EchoAlgorithmNodeEntity>
    ): void {
        // update node
        env.local.set("isInitiator", true);
        env.local.set("isInformed", true);

        // inform neighbors
        for (const neighbor of env.out.getNeighborIterator()) {
            const msg: InfoMessageData =
                new InfoMessageData({ id: env.local.get("id") });
            env.out.send(msg, neighbor.id);
        }
    }


    public onIncomingMessage(
        env: NodeProcessEnvironment<EchoAlgorithmNodeEntity>
    ): void {
        const msg: Readonly<MessageData> = env.in.readPendingMessage();

        // check if msg can be handled
        if (msg instanceof InfoMessageData) {
            this.onInfoMessage(msg, env);
        }
        else if (msg instanceof EchoMessageData) {
            this.onEchoMessage(env);
        }
        else { // cannot handle message
            env.up.logWarning(
                `Received unknown message of type ${msg.type}`
            );
        }
    }

    private onInfoMessage(
        msg: InfoMessageData,
        env: NodeProcessEnvironment<EchoAlgorithmNodeEntity>
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
            for (const neighbor of env.out.getNeighborIterator()) {
                if (neighbor.id != parent.id) {

                    const infoMsgData: InfoMessageData =
                        new InfoMessageData({ id: env.local.get("id") });
                    env.out.send(infoMsgData, neighbor.id);
                }
            }
        }

        if (this.allNeighborsInformed(env)) {
            this.handleAllNeighborsInformed(env);
        }
    }

    private onEchoMessage(
        env: NodeProcessEnvironment<EchoAlgorithmNodeEntity>
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
        env: NodeProcessEnvironment<EchoAlgorithmNodeEntity>
    ): boolean {
        return env.local.get("numberInformedNeighbors")
            >= env.out.getNeighborCount();
    }

    /**
     * handles reaction of node process if all
     * neighbors are informed
     */
    private handleAllNeighborsInformed(
        env: NodeProcessEnvironment<EchoAlgorithmNodeEntity>
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
            env.out.send(new EchoMessageData(), parent.id);
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

