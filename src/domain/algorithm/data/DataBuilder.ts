import { GenericNode } from "./Data.js";

//* AlgorithmNodeData Builder

export abstract class IAlgorithmNodeBuilder {

    // throws error
    public abstract build(json: string): GenericNode;

}