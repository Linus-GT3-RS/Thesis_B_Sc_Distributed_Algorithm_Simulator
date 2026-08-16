import TinyQueue from "tinyqueue";
import { GenericEdge, GenericMessage, GenericNode } from "./AlgoData.js";
import { Miliseconds } from "../../common/Time.js";

export class NodeNotFoundError extends Error { }
export class EdgeNotFoundError extends Error { }


export class AlgorithmDataWorker {

    public getNeighborIds(
        node: Readonly<GenericNode>,
        edges: Readonly<MapIterator<GenericEdge>>
    ): Array<number> {
        const neighbors: Array<number> = new Array();

        for (const edge of edges) {
            if (edge.nodeA.id === node.id) {
                neighbors.push(edge.nodeB.id);
            }
            else if (edge.nodeB.id === node.id) {
                neighbors.push(edge.nodeA.id);
            }
        }

        return neighbors;
    }


    /**
     * 
     * @param id 
     * @param edge
     * @throws NodeNotFoundError
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
        throw new NodeNotFoundError();
    }


    /**
     * 
     * @param nodeId 
     * @param nodes 
     * @throws NodeNotFoundError if nodes doest not contain nodeId
     */
    public getNode(nodeId: number, nodes: Map<number, GenericNode>): GenericNode {
        const node: GenericNode | undefined = nodes.get(nodeId);
        if (node === undefined) {
            throw new NodeNotFoundError("Nodes Container does not contain given NodeID");
        }
        return node;
    }


    /**
     * 
     * @param nodeAId 
     * @param nodeBId 
     * @param edges 
     * @throws EdgeNotFoundError
     */
    public getEdge(
        id1: number,
        id2: number,
        edges: MapIterator<GenericEdge>
    ): GenericEdge {
        for (const edge of edges) {
            if ((edge.nodeA.id === id1 && edge.nodeB.id === id2)
                || (edge.nodeA.id === id2 && edge.nodeB.id === id1)
            ) {
                return edge;
            }
        }
        throw new EdgeNotFoundError(`Edge with id1=${id1} and id2=${id2} not found in edges=${edges}`);
    }


    // todo throw error?
    // dequeues only if a msg is pending!
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