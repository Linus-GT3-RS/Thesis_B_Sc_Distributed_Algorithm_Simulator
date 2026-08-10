import { GenericNode, GenericEdge } from "../algorithm/data/AlgoData.js";
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
        nodeStore: Array<GenericNode>,
    ): void {
        throw new Error();
    }

    // throws Error
    public buildNode(json: string): GenericNode {
        throw new Error();
    }

    //* Edge

    // throws error
    public processEdge(
        json: string, //?
        nodeStore: Array<GenericNode>,
        edgeStore: Array<GenericEdge>,
    ): void {
        throw new Error();
    }

    // throws Error
    public buildEdge(json: string): GenericEdge {
        throw new Error();
    }

}