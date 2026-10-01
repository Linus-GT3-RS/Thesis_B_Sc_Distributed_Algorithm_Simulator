import type { Identifiable } from "../../../../../common/EntityStores.js";
import { INodeProcess } from "../../plugin_api/entities/behaviour_entities/NodeProcess.js";
import type { ProcessEnvironment } from "../../plugin_api/entities/behaviour_entities/NodeProcessEnv.js";
import { MessageData } from "../../plugin_api/entities/state_entities/Messages.js";
import { EchoAlgorithmNodeState, InfoMessageData, EchoMessageData } from "./data/EchoAlgoEntities.js";

/**
 * Runs Echo Algorithm Protocol
 */
export class EchoAlgorithmNodeProcess
    implements INodeProcess<EchoAlgorithmNodeState> {

    public onInitiationInstruction(
        env: ProcessEnvironment<EchoAlgorithmNodeState>
    ): void {
        // update node
        env.local.set("isInitiator", true);
        env.local.set("isInformed", true);

        // inform neighbors
        for (const neighbor of env.out.getNeighbors()) {
            const msg: InfoMessageData =
                new InfoMessageData({ id: env.local.get("id") });
            env.out.send(msg, neighbor.id);
        }
    }


    public onIncomingMessage(
        env: ProcessEnvironment<EchoAlgorithmNodeState>
    ): void {
        const msg: Readonly<MessageData> = env.in.readFirst();

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
        env: ProcessEnvironment<EchoAlgorithmNodeState>
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
            for (const neighbor of env.out.getNeighbors()) {
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
        env: ProcessEnvironment<EchoAlgorithmNodeState>
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
        env: ProcessEnvironment<EchoAlgorithmNodeState>
    ): boolean {
        return env.local.get("numberInformedNeighbors")
            >= env.out.getNeighborCount();
    }

    /**
     * handles reaction of node process if all
     * neighbors are informed
     */
    private handleAllNeighborsInformed(
        env: ProcessEnvironment<EchoAlgorithmNodeState>
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

