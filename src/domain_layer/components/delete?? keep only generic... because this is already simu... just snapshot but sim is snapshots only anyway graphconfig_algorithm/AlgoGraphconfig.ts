import { GenericNodeState, GenericBiDirectionalEdge } from "../simulation/algorithm_plugin_api/entities/state_entities/AlgoData.js";

export class AlgorithmGraphconfig {

    constructor(
        public nodes: Array<GenericNodeState>,
        public edges: Array<GenericBiDirectionalEdge>,

        public algorithm: AlgorithmIdentifier,
    ) { }

}

