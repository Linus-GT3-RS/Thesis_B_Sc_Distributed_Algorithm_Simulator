import { GenericEdge, GenericNode } from "../algorithm/data/Data.js";

//* Node Capsule

export class NodeCapsule extends GenericNode {
    constructor(
        id: number,

        public properties: string //? todo
    ) {
        super(id);
    }

}


//* Generic Graphconfig

export class GenericGraphconfig {

    public constructor(
        public nodes: Array<NodeCapsule>,
        public edges: Array<GenericEdge>,
    ) { }
}

