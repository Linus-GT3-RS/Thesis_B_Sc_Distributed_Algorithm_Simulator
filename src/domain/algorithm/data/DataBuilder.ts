import { GenericNode } from "./Data.js";

//* AlgorithmNodeData Builder

export abstract class IAlgorithmNodeBuilder {


    /** Builds a Node
     * 
     * @param json - does stuff
     * @throws Error
     */
    public abstract build(json: string): GenericNode;

}