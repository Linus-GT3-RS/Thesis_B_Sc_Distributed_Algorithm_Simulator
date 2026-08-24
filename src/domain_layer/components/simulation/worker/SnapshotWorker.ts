import { ReadonlyEdgeStore as ReadonlyEdgeStateStore } from "../engine/env_system_impl/MsgSenderSystem.js";
import { IndexedStore } from "../../../../common/EntityStores.js";
import { MessageQueue, PendingMessage } from "../SimulationSnapshot.js";


//* Errors

/**
 * Indicates that the simulation encountered 
 * an internal unrecoverable error.
 *
 * The engine is now in an invalid state and must be reset.
 */
export class SnapshotWorkerError extends Error { }


//* Data

export interface NodeNeighbor {
    id: number
    distance_ms: number
}
export type NeighborStore = IndexedStore<NodeNeighbor>;
export type Neighbor = Readonly<IndexedStore<Readonly<NodeNeighbor>>>;


//* Worker

/**
 * Performs data operations
 * on a SimulationSnapshot
 */
export class SnapshotDataWorker {

    /**
     * Returns all neighbors of a node
     * 
     * @param edgeStates 
     * @param scopedNode 
     */
    public getNodeNeighbors(
        edgeStates: ReadonlyEdgeStateStore,
        scopedNode: number,
    ): NeighborStore {
        const neighbors: NeighborStore = new IndexedStore<NodeNeighbor>();

        for (const edgeState of edgeStates.readAllValues()) {
            if (scopedNode === edgeState.nodeA.id) {
                neighbors.insert({
                    id: edgeState.nodeB.id,
                    distance_ms: edgeState.length_ms
                });
            }
            else if (scopedNode === edgeState.nodeB.id) {
                neighbors.insert({
                    id: edgeState.nodeA.id,
                    distance_ms: edgeState.length_ms
                });
            }
        }

        return neighbors;
    }


    /**
     * Checks if the next message in queue is pending
     * at given time 
     * 
     * @param queue 
     * @param t_ms The timestamp if the simulation at which the
     *              check should occur
     * @returns true if a message is pending or false if none
    *              is pending (either they are not dude yet or none exist)
     */
    public pendingMsgExists(
        queue: Readonly<MessageQueue>,
        t_ms: number
    ): boolean {
        const peeked: Readonly<PendingMessage> | undefined
            = queue.peek();

        const pendingExists: boolean =
            peeked !== undefined &&
            (peeked.destinationTime <= t_ms);

        return pendingExists;
    }


    /**
     * Pops the next item in queue
     * 
     * @throws {SnapshotWorkerError} if queue is empty
     */
    public popPendingMessage(
        queue: MessageQueue // full access
    ): Readonly<PendingMessage> {
        const next: Readonly<PendingMessage> | undefined = queue.pop();
        if (next !== undefined) {
            return next;
        }
        throw new SnapshotWorkerError(`
            Expected queue to contain atleast one PendingMessage,
            but found none.`
        );
    }


}


// export class SimulationEntityWorker {




//     // /**
//     //  * 
//     //  * @param id 
//     //  * @param edge
//     //  * @throws {SimulationEntityWorkerError}
//     //  */
//     // public getNodeFromEdge(
//     //     id: number,
//     //     edge: GenericBiDirectionalEdgeState
//     // ): GenericNodeState {
//     //     if (edge.nodeA.id === id) {
//     //         return edge.nodeA;
//     //     }
//     //     else if (edge.nodeB.id === id) {
//     //         return edge.nodeB;
//     //     }
//     //     throw new SimulationEntityWorkerError();
//     // }


//     // /**
//     //  * Finds the edge connecting the two given node ids
//     //  * @param nodeAId 
//     //  * @param nodeBId 
//     //  * @param edges 
//     //  * @throws {SimulationEntityWorkerError} if the edge does not exist
//     //  */
//     // public findEdge(
//     //     id1: number, id2: number,
//     //     edges: MapIterator<Readonly<GenericBiDirectionalEdgeState>>
//     // ): GenericBiDirectionalEdgeState {
//     //     for (const edge of edges) {
//     //         if ((edge.nodeA.id === id1 && edge.nodeB.id === id2)
//     //             || (edge.nodeA.id === id2 && edge.nodeB.id === id1)
//     //         ) {
//     //             return edge;
//     //         }
//     //     }
//     //     throw new SimulationEntityWorkerError(`
//     //         Edge with id1=${id1} and id2=${id2} not found in edges=${edges}`
//     //     );
//     // }



// }