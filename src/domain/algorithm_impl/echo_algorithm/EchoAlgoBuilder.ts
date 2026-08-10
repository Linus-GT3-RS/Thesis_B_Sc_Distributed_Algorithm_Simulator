import { GenericNode } from "../../algorithm/data/AlgoData.js";
import { IAlgorithmNodeBuilder } from "../../algorithm/data/AlgoDataBuilder.js";

export class EchoAlgorithmNodeBuilder
    implements IAlgorithmNodeBuilder {

    public build(json: string): GenericNode {
        throw new Error();
    }

}
