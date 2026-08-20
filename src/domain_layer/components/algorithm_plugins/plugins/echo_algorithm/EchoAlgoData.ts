import { GenericNodeState, GenericMessageData } from "../../simulation/algorithm_plugin_api/entities/state_entities/AlgoData.js";

//* Node Data

export class EchoAlgorithmNode extends GenericNodeState {
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

export class InfoData extends GenericMessageData {
    constructor(
        public senderID: number,
    ) {
        super("info");
    }
}

export class EchoData extends GenericMessageData {
    constructor(
    ) {
        super("echo");
    }
}