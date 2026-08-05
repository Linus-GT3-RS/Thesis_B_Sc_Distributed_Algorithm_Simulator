import { GenericNode } from "./Data";

//* AlgorithmNodeData Builder

export abstract class IAlgorithmNodeBuilder {

    // throws error
    public abstract build(json: string): GenericNode;

}