import TinyQueue from "tinyqueue";
import { ReadonlyEdgeStore as ReadonlyEdgeStateStore } from "../engine/env_system_impl/MsgSenderSystem.js";
import { IndexedStore } from "../../../../common/EntityStores.js";
import { PendingMessage } from "../SimulationSnapshot.js";

export class SimulationEntityWorkerError extends Error { }

export interface NodeNeighbor {
    id: number
    distance_ms: number
}
export type NeighborStore = IndexedStore<NodeNeighbor>;
export type Neighbor = Readonly<IndexedStore<Readonly<NodeNeighbor>>>;

/**
 * Performs data operations
 * on a SimulationSnapshot
 */
export class SimSnapshotDataWorker {

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



    //! todo full rework
    /**
     * dequeues the next pending msg
     * @param messages 
     * @param queryTimestamp 
     * @returns null if no msg is pending
     */
    public dequeueNextPendingMessage(
        messages: TinyQueue<PendingMessage>,
        now: number,
    ): PendingMessage | null {

        // sanity check if queue empty
        const next: PendingMessage | undefined = messages.peek();
        if (next === undefined) {
            return null;
        }
        else if (next.destinationTime <= now) {
            return messages.pop()!;
        }
        return null
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



//     // /**
//     //  * dequeues the next pending msg
//     //  * @param messages 
//     //  * @param queryTimestamp 
//     //  * @returns null if no msg is pending
//     //  */
//     // public dequeueNextPendingMessage(
//     //     messages: TinyQueue<GenericMessage>,
//     //     queryTimestamp: Miliseconds,
//     // ): GenericMessage | null {
//     //     // sanity check if queue empty
//     //     const next: GenericMessage | undefined = messages.peek();
//     //     if (next === undefined) {
//     //         return null;
//     //     }

//     //     if (next.destinationTime <= queryTimestamp) {
//     //         messages.pop(); // dequeue
//     //         return next;
//     //     }
//     //     return null;
//     // }

// }