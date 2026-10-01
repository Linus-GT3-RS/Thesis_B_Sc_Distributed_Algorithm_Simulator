import type { Identifiable, ReadonlyIndexedStore } from "../../../../../common/EntityStores.js";
import { IdentifiableError } from "../../../../../common/EntityStores.js";
import { IEnvSystemMessageOutbox, MessageSystemError } from "../../../algorithm_plugins/plugin_api/entities/behaviour_entities/EnvironmentSystems.js";
import { UndirectedEdgeState } from "../../../algorithm_plugins/plugin_api/entities/state_entities/Edges.js";
import { MessageData, MessageState } from "../../../algorithm_plugins/plugin_api/entities/state_entities/Messages.js";
import type { MessageQueue, MessageStateStore } from "../../data/SimulationSnapshot.js";
import type { NeighborStore, NodeNeighbor } from "../../data/SnapshotWorker.js";
import { SnapshotDataWorker as SnapshotDataWorker } from "../../data/SnapshotWorker.js";
import { IChangeObserverCollection } from "../../entity_observation/EntityCollectionObserver.js";

//* Types

export type ReadonlyEdgeStore = ReadonlyIndexedStore<UndirectedEdgeState>;


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
export class MessageSenderSystem implements IEnvSystemMessageOutbox {

    // represents neighbors of scoped node
    private scopedNeighborStore: NeighborStore | null = null;

    constructor(
        private store: MessageStateStore, // full access
        private queue: MessageQueue, // full access
        private creationObs: IChangeObserverCollection<MessageState>,

        private simulationTime: number,
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
        this.creationObs.notifyChange(message);
    }


    public getNeighborCount(): number {
        return this.getScopedNeighborStore().size();
    }


    public getNeighbors(): MapIterator<Readonly<Identifiable>> {
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

