
//* Node Data

import type { Identifiable } from "../../../../../../common/EntityStores.js";
import { MessageData } from "../../../plugin_api/entities/state_entities/Messages.js";
import { NodeState } from "../../../plugin_api/entities/state_entities/Nodes.js";

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

export class InfoMessageData extends MessageData {
    constructor(
        public senderID: Identifiable,
    ) {
        super("Info");
    }
}

export class EchoMessageData extends MessageData {
    constructor(
    ) {
        super("Echo");
    }
}