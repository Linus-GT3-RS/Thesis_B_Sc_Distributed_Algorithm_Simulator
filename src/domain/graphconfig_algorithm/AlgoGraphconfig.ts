import { GenericNode, GenericEdge } from "../algorithm/data/Data";

export class AlgorithmGraphconfig {

    constructor(
        public nodes: Array<GenericNode>,
        public edges: Array<GenericEdge>,

        public algorithm: AlgorithmIdentifier,
    ) { }

}

