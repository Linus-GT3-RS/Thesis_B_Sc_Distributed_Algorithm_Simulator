import type { Identifiable } from "@/common/EntityStores.js";
import { MessageData } from "../../api/entities/state_entities/Messages.js";
import { NodeState } from "../../api/entities/state_entities/Nodes.js";

//* Node Data

export class EchoAlgorithmNodeState extends NodeState {
    constructor(
        id: number,

        public isInitiator: boolean,
        public isInformed: boolean,
        public numberInformedNeighbors: number,
        public parentID: Identifiable | null,
    ) {
        super(id);
    }
}


//* Message Data

export class InfoData extends MessageData {
    constructor(
        public senderID: Identifiable,
    ) {
        super("info");
    }
}

export class EchoData extends MessageData {
    constructor(
    ) {
        super("echo");
    }
}