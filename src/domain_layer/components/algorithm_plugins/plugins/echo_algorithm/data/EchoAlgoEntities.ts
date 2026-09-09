
//* Node Data

import { Identifiable } from "../../../../../../common/EntityStores.js";
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
        super("info-msg-payload");
    }
}

export class EchoMessageData extends MessageData {
    constructor(
    ) {
        super("echo-msg-payload");
    }
}