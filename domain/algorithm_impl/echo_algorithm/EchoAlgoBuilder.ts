import { GenericNode } from "../../algorithm/data/Data";
import { IAlgorithmNodeBuilder } from "../../algorithm/data/DataBuilder";

export class EchoAlgorithmNodeBuilder
    implements IAlgorithmNodeBuilder {

    public build(json: string): GenericNode {
        throw new Error();
    }

}
