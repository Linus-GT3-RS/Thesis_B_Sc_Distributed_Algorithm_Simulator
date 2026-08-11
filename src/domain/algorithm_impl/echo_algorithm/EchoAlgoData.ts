import { GenericNode } from "../../algorithm/data/AlgoData.js";

//* Node Data

export class EchoAlgorithmNode extends GenericNode {
    constructor(
        id: number,

        public isInitiator: boolean,
        public isInformed: boolean,
        public numberInformedNeighbors: number,
        public parentID: number | null,
    ) {
        super(id);
    }
}


//* Message Data

export class InfoMessageData {
    constructor(
        public senderID: number
    ) { }
}

export class EchoMessageData { }