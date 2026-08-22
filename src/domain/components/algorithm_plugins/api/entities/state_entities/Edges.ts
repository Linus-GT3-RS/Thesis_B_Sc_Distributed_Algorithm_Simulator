import { Identifiable } from "../../../../../../common/EntityStores.js";

export class BiDirectionalEdgeState {
    constructor(
        public id: number,
        public nodeA: Identifiable,
        public nodeB: Identifiable,
        public length_ms: number,
    ) { }
}