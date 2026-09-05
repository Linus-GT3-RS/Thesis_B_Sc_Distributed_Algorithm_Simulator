import { BiDirectionalEdgeState } from "../../../algorithm_plugins/api/entities/state_entities/Edges.js";
import { NodeLog } from "../../../algorithm_plugins/api/entities/state_entities/Logs.js";
import { MessageState } from "../../../algorithm_plugins/api/entities/state_entities/Messages.js";
import { NodeState } from "../../../algorithm_plugins/api/entities/state_entities/Nodes.js";
import { PresentationModelEdgeState, PresentationModelMessageState, PresentationModelNodeLog, PresentationModelNodeState } from "./PresentationModels.js";


export class ModelBuilderNodeLog {

    public build(log: Readonly<NodeLog>): PresentationModelNodeLog {
        return new PresentationModelNodeLog(
            log.id,
            log.type.toString(), log.msg,
            log.logger
        );
    }

}


export class ModelBuilderNodeState {

    public build(state: Readonly<NodeState>): PresentationModelNodeState {
        return new PresentationModelNodeState(
            state.id,
            new Map<string, string>(), new Map<string, string>()
        );
    }

}


export class ModelBuilderMessageState {

    public build(state: Readonly<MessageState>): PresentationModelMessageState {
        return new PresentationModelMessageState(
            state.id,
            state.sender, state.receiver,
            state.sendTime, state.destinationTime,
            new Map<string, string>(), new Map<string, string>()
        );
    }

}


export class ModelBuilderEdgeState {

    public build(state: Readonly<BiDirectionalEdgeState>): PresentationModelEdgeState {
        return new PresentationModelEdgeState(
            state.id,
            state.nodeA.id, state.nodeB.id, state.length_ms,
            "bidirectional",
            new Map<string, string>(), new Map<string, string>(),
        );
    }

}