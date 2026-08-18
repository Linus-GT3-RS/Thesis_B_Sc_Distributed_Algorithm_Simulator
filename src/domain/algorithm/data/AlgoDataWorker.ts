import TinyQueue from "tinyqueue";
import { GenericEdge, GenericMessage, GenericNode } from "./AlgoData.js";
import { Miliseconds } from "../../common/Time.js";
import { Identifiable } from "../../common/EntityStores.js";

export class AlgorithmDataWorkerError extends Error { }

/**
 * Has the authority granted by the SimulationEngine to modify simulation state.
 *
 * Performs data operations requested by the SimulationEngine.
 */
export class AlgorithmDataWorker {

    public getNeighborIds(
        targetNode: Identifiable,
        edges: MapIterator<Readonly<GenericEdge>>
    ): Array<number> {
        const neighbors: Array<number> = new Array();

        for (const edge of edges) {
            if (edge.nodeA.id === targetNode.id) {
                neighbors.push(edge.nodeB.id);
            }
            else if (edge.nodeB.id === targetNode.id) {
                neighbors.push(edge.nodeA.id);
            }
        }

        return neighbors;
    }


    /**
     * 
     * @param id 
     * @param edge
     * @throws {AlgorithmDataWorkerError}
     */
    public getNodeFromEdge(
        id: number,
        edge: GenericEdge
    ): GenericNode {
        if (edge.nodeA.id === id) {
            return edge.nodeA;
        }
        else if (edge.nodeB.id === id) {
            return edge.nodeB;
        }
        throw new AlgorithmDataWorkerError();
    }


    /**
     * Finds the edge connecting the two given node ids
     * @param nodeAId 
     * @param nodeBId 
     * @param edges 
     * @throws {AlgorithmDataWorkerError} if the edge does not exist
     */
    public findEdge(
        id1: number, id2: number,
        edges: MapIterator<Readonly<GenericEdge>>
    ): GenericEdge {
        for (const edge of edges) {
            if ((edge.nodeA.id === id1 && edge.nodeB.id === id2)
                || (edge.nodeA.id === id2 && edge.nodeB.id === id1)
            ) {
                return edge;
            }
        }
        throw new AlgorithmDataWorkerError(`
            Edge with id1=${id1} and id2=${id2} not found in edges=${edges}`
        );
    }



    /**
     * dequeues the next pending msg
     * @param messages 
     * @param queryTimestamp 
     * @returns null if no msg is pending
     */
    public dequeueNextPendingMessage(
        messages: TinyQueue<GenericMessage>,
        queryTimestamp: Miliseconds,
    ): GenericMessage | null {
        // sanity check if queue empty
        const next: GenericMessage | undefined = messages.peek();
        if (next === undefined) {
            return null;
        }

        if (next.destinationTime <= queryTimestamp) {
            messages.pop(); // dequeue
            return next;
        }
        return null;
    }

}