import { GenericNode } from "../../algorithm/data/Data.js";
import { IAlgorithmNodeBuilder } from "../../algorithm/data/DataBuilder.js";

export class EchoAlgorithmNodeBuilder
    implements IAlgorithmNodeBuilder {

    public build(json: string): GenericNode {
        throw new Error();
    }

}
