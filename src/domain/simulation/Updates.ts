import { GenericMessage, GenericNode } from "../algorithm/data/AlgoData.js";
import { Identifiable, ReadonlyStore } from "../common/EntityStores.js";
import { NodeLog } from "./SimulationEngine.js";

/**
 * stores only latest update
 * better performance
 */
export class SimulationUpdateListener {

    constructor(
        private readonly updatedNodes: Set<number>,
        private readonly updatedMessages: Set<number>,
        private readonly updatedLogs: Set<number>,
    ) { }

    public notifyNodeUpdated(node: Readonly<Identifiable>): void {
        this.updatedNodes.add(node.id);
    }

    public notifyMessageUpdated(msg: Readonly<Identifiable>): void {
        this.updatedMessages.add(msg.id);
    }

    public notifyLogUpdated(log: Readonly<Identifiable>): void {
        this.updatedLogs.add(log.id);
    }

}

export type NodeUpdateListener = Pick<SimulationUpdateListener, "notifyNodeUpdated">;
export type MessageUpdateListener = Pick<SimulationUpdateListener, "notifyMessageUpdated">;
export type LogUpdateListener = Pick<SimulationUpdateListener, "notifyLogUpdated">;



export class SimulationSnapshotPresenter {

    /**
     * 
     * @param snapshotMessages 
     * @param updates 
     * @throws {IdentifiableError} if id of updated message does not exist in snapshot of messages
     */
    public presentMessageUpdates(
        snapshotMessages: ReadonlyStore<GenericMessage>,
        updates: ReadonlySet<number>
    ): void {
        for (const idUpdated of updates) {
            // get update
            const updatedMessage: Readonly<GenericMessage> = snapshotMessages.peek({ id: idUpdated });

            // present update
            console.log(updatedMessage);
        }
    }

    /**
     * 
     * @param snapshotNodes 
     * @param updatedNodes 
     * @throws {IdentifiableError} if id of updated node does not exist in snapshot of nodes
     */
    public presentUpdatedNodes(snapshotNodes: ReadonlyStore<GenericNode>, updatedNodes: ReadonlySet<number>): void {
        for (const idUpdatedNode of updatedNodes) {
            // get update
            const updatedNode: Readonly<GenericNode> = snapshotNodes.peek({ id: idUpdatedNode });

            // present update
            console.log(updatedNode);
        }
    }


    /**
     * 
     * @param snapshot 
     * @param updatedLogs 
     * @throws {IdentifiableError} if id of update log does not exist in snapshot of logs
     */
    public presentUpdatedLogs(snapshot: ReadonlyStore<NodeLog>, updatedLogs: ReadonlySet<number>): void {
        for (const idUpdatedLog of updatedLogs) {
            // get update
            const updatedLog: Readonly<NodeLog> = snapshot.peek({ id: idUpdatedLog });

            // present update
            console.log(updatedLog);
        }
    }
}