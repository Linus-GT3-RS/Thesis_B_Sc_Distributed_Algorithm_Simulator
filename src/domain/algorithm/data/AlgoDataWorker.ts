import { GenericEdge, GenericNode } from "./Data.js";


export class AlgorithmDataWorker {

    public getNeighborIDs(
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

}