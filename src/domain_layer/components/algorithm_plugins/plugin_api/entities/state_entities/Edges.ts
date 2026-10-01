import type { Identifiable } from "../../../../../../common/EntityStores.js";

/**
 * Represents an edge that is bi-directional
 */
export class UndirectedEdgeState {
    constructor(
        public id: number,

        // todo make readonly nodestate? so that modelbeuilder can access the nodes for details
        public nodeA: Identifiable,
        public nodeB: Identifiable,

        public length_ms: number,
    ) { }
}