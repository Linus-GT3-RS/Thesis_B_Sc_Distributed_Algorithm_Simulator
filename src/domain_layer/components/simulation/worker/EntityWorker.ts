import TinyQueue from "tinyqueue";
import { Identifiable } from "../../../../../../common/EntityStores.js";
import { Miliseconds } from "../../../../../../common/Time.js";
import { GenericNodeState } from "../state_entities/Nodes.js";
import { GenericBiDirectionalEdgeState } from "../state_entities/Edges.js";

export class SimulationEntityWorkerError extends Error { }

/**
 * Performs data operations
 */
export class SimulationEntityWorker {

    // public getNeighborIds(
    //     targetNode: Identifiable,
    //     edges: MapIterator<Readonly<GenericBiDirectionalEdgeState>>
    // ): Array<number> {
    //     const neighbors: Array<number> = new Array();

    //     for (const edge of edges) {
    //         if (edge.nodeA.id === targetNode.id) {
    //             neighbors.push(edge.nodeB.id);
    //         }
    //         else if (edge.nodeB.id === targetNode.id) {
    //             neighbors.push(edge.nodeA.id);
    //         }
    //     }

    //     return neighbors;
    // }


    // /**
    //  * 
    //  * @param id 
    //  * @param edge
    //  * @throws {SimulationEntityWorkerError}
    //  */
    // public getNodeFromEdge(
    //     id: number,
    //     edge: GenericBiDirectionalEdgeState
    // ): GenericNodeState {
    //     if (edge.nodeA.id === id) {
    //         return edge.nodeA;
    //     }
    //     else if (edge.nodeB.id === id) {
    //         return edge.nodeB;
    //     }
    //     throw new SimulationEntityWorkerError();
    // }


    // /**
    //  * Finds the edge connecting the two given node ids
    //  * @param nodeAId 
    //  * @param nodeBId 
    //  * @param edges 
    //  * @throws {SimulationEntityWorkerError} if the edge does not exist
    //  */
    // public findEdge(
    //     id1: number, id2: number,
    //     edges: MapIterator<Readonly<GenericBiDirectionalEdgeState>>
    // ): GenericBiDirectionalEdgeState {
    //     for (const edge of edges) {
    //         if ((edge.nodeA.id === id1 && edge.nodeB.id === id2)
    //             || (edge.nodeA.id === id2 && edge.nodeB.id === id1)
    //         ) {
    //             return edge;
    //         }
    //     }
    //     throw new SimulationEntityWorkerError(`
    //         Edge with id1=${id1} and id2=${id2} not found in edges=${edges}`
    //     );
    // }



    // /**
    //  * dequeues the next pending msg
    //  * @param messages 
    //  * @param queryTimestamp 
    //  * @returns null if no msg is pending
    //  */
    // public dequeueNextPendingMessage(
    //     messages: TinyQueue<GenericMessage>,
    //     queryTimestamp: Miliseconds,
    // ): GenericMessage | null {
    //     // sanity check if queue empty
    //     const next: GenericMessage | undefined = messages.peek();
    //     if (next === undefined) {
    //         return null;
    //     }

    //     if (next.destinationTime <= queryTimestamp) {
    //         messages.pop(); // dequeue
    //         return next;
    //     }
    //     return null;
    // }

}