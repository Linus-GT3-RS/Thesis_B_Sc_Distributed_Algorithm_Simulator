import { NodeLog } from "../../algorithm_plugins/api/entities/state_entities/Logs.js";
import { NodeState } from "../../algorithm_plugins/api/entities/state_entities/Nodes.js";
import { PresentationModelNodeLog, PresentationModelNodeState } from "./PresentationModels.js";


export class ModelBuilderNodeLog {

    public build(log: Readonly<NodeLog>): PresentationModelNodeLog {

    }

}



export class ModelBuilderNodeState {


    public build(state: Readonly<NodeState>): PresentationModelNodeState {

    }

}