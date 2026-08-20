import { GenericNodeState } from "../../simulation/algorithm_plugin_api/entities/state_entities/AlgoData.js";
import { IAlgorithmNodeBuilder } from "../../simulation/algorithm_plugin_api/entities/state_entities/AlgoDataBuilder.js";

export class EchoAlgorithmNodeBuilder
    implements IAlgorithmNodeBuilder {

    public build(json: string): GenericNodeState {
        throw new Error();
    }

}
