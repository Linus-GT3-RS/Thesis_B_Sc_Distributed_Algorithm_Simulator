import type { Identifiable } from "@/common/EntityStores";

export class BiDirectionalEdgeState {
    constructor(
        public id: number,
        public nodeA: Identifiable,
        public nodeB: Identifiable,
        public length_ms: number,
    ) { }
}