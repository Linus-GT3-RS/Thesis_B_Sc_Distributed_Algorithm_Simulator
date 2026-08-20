import { GenericNodeState, GenericBiDirectionalEdge } from "../simulation/algorithm_plugin_api/entities/state_entities/AlgoData.js";
import { GenericGraphconfig } from "./GenGraphconfig.js";

//* GenericGraphconfig Builder

// tries to build the Object
// sets default values if a value is not given
// - e.g. id
// throws error if important value is missing
export class GenericGraphconfigBuilder {

    // throws error
    public build(
        json: string //?
    ): GenericGraphconfig {
        throw new Error();
    }

    //* Node

    // throws error
    public processNode(
        json: string, //?
        nodeStore: Array<GenericNodeState>,
    ): void {
        throw new Error();
    }

    // throws Error
    public buildNode(json: string): GenericNodeState {
        throw new Error();
    }

    //* Edge

    // throws error
    public processEdge(
        json: string, //?
        nodeStore: Array<GenericNodeState>,
        edgeStore: Array<GenericBiDirectionalEdge>,
    ): void {
        throw new Error();
    }

    // throws Error
    public buildEdge(json: string): GenericBiDirectionalEdge {
        throw new Error();
    }

}