import { Identifiable } from "../../common/EntityStores.js";
import { MilisecsSinceEpoch } from "../../common/Time.js";

//* Algorithm Node

export class GenericNode {
    constructor(
        public id: number
    ) { }
}

//* Algorithm Edge

export class GenericEdge {
    constructor(
        public id: number,

        public nodeA: GenericNode,
        public nodeB: GenericNode,
        public length_ms: number,
    ) { }
}


//* Algorithm Message

export class GenericMessage {
    constructor(
        public id: number,

        public destinationTime: MilisecsSinceEpoch,
        public receiver: Identifiable,
        public data: unknown,
    ) { }
}








