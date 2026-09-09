import { Identifiable } from "../../../../../../common/EntityStores.js";

export class BiDirectionalEdgeState {
    constructor(
        public id: number,

        // todo make readonly nodestate? so that modelbeuilder can access the nodes for details
        public nodeA: Identifiable,
        public nodeB: Identifiable,

        public length_ms: number,
    ) { }
}