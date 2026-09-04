import { Identifiable, IdentifiableError, ReadonlyIndexedStore } from "../../../../../common/EntityStores.js";
import { IOutgoingMessageSystem, MessageSystemError } from "../../../algorithm_plugins/api/entities/behaviour_entities/EnvironmentSystems.js";
import { BiDirectionalEdgeState } from "../../../algorithm_plugins/api/entities/state_entities/Edges.js";
import { MessageData, MessageState } from "../../../algorithm_plugins/api/entities/state_entities/Messages.js";
import { NeighborStore, NodeNeighbor, SnapshotDataWorker as SnapshotDataWorker } from "../../data/SnapshotWorker.js";
import { MessageQueue, MessageStateStore } from "../../data/SimulationSnapshot.js";
import { EntityUpdateListener } from "../../presentation/EntityStateObserver.js";

//* Types

export type ReadonlyEdgeStore = ReadonlyIndexedStore<BiDirectionalEdgeState>;


//* System

/**
 * The {@link MessageSenderSystem} is part of the SimulationEngine and 
 * implements a system of the {@link NodeProcessEnvironment}.
 *
 * From the perspective of a NodeProcess, the system behaves as a
 * local part of its environment. The actual implementation, however, is
 * part of the {@link SimulationEngine} and therefore has access to 
 * the current state of the simulation via the {@link SimulationSnapshot}.
 *
 * This allows interactions performed by the NodeProcess to be translated
 * into simulation-specific actions, such as queuing messages, creating log
 * entries, or updating the presentation.
 */
export class MessageSenderSystem implements IOutgoingMessageSystem {

    // represents neighbors of scoped node
    private scopedNeighborStore: NeighborStore | null = null;

    constructor(
        private store: MessageStateStore, // full access
        private queue: MessageQueue, // full access
        private simulationTime: number,
        private updateObserver: EntityUpdateListener<MessageState>,

        private edgeStates: ReadonlyEdgeStore,  // read only access
        private worker: SnapshotDataWorker,

        private scopedNode: number,
    ) { }


    public send(
        data: MessageData,
        receiver: number
    ): void {
        let receiverNode: NodeNeighbor;
        try {
            receiverNode = this.getScopedNeighborStore().read({
                id: receiver
            });
        }
        catch (error) {
            if (error instanceof IdentifiableError) {
                throw new MessageSystemError(
                    `ReceiverNode with id=${receiver} has no edge connecting him 
                    to SenderNode with id=${this.scopedNode}.
                    No Message with data=${data} was sent.`
                );
            }
            throw error;
        }

        const message = new MessageState(
            this.store.size(),
            this.scopedNode, receiverNode.id,
            this.simulationTime, this.simulationTime + receiverNode.distance_ms,
            data
        );
        this.store.insert(message);
        this.queue.push(message);
        this.updateObserver.notifyUpdate(message);
    }


    public getNeighborCount(): number {
        return this.getScopedNeighborStore().size();
    }


    public getNeighborIterator(): MapIterator<Readonly<Identifiable>> {
        return this.getScopedNeighborStore().readAllValues();
    }


    private getScopedNeighborStore(): NeighborStore {
        if (this.scopedNeighborStore === null) { // first time
            this.scopedNeighborStore =
                this.worker.getNodeNeighbors(this.edgeStates, this.scopedNode);
        }
        return this.scopedNeighborStore;
    }


}

