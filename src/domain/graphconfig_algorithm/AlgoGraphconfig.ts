import { GenericNode, GenericEdge } from "../algorithm/data/AlgoData.js";

export class AlgorithmGraphconfig {

    constructor(
        public nodes: Array<GenericNode>,
        public edges: Array<GenericEdge>,

        public algorithm: AlgorithmIdentifier,
    ) { }

}

