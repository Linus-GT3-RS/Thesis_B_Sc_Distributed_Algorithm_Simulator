import { AlgorithmInitiationTypes as AlgorithmInitiationType } from "./algorithm/AlgoInitiationTypes.js";
import { GenericAlgorithm } from "./algorithm/Algorithm.js";
import { IAlgorithmNodeBuilder } from "./data/AlgoDataBuilder.js";
import { IAlgorithmEdgeRenderer, IAlgorithmMessageDataRenderer, IAlgorithmNodeRenderer } from "./rendering/Renderer.js";

// lists all existing algorithms
export enum AlgorithmIdentifier {
    Echo_Algorithm
}


//* Algorithm RegistryEntry

export class AlgorithmRegistryEntry {
    constructor(
        public algorithm: AlgorithmIdentifier,
        public displayName: string,

        public getAlgorithm: () => GenericAlgorithm,
        public initType: AlgorithmInitiationType,

        public getNodeBuilder: () => IAlgorithmNodeBuilder,

        public getNodeRenderer: () => IAlgorithmNodeRenderer,
        public getEdgeRenderer: () => IAlgorithmEdgeRenderer,
        public getMessageDataRenderer: () => IAlgorithmMessageDataRenderer,
    ) { }
}


//* Algorithm Registry

// todo readonly
export const algorithmRegistry =
    new Map<AlgorithmIdentifier, AlgorithmRegistryEntry>([

        //? EchoAlgorithm Entry
        // [
        //     AlgorithmIdentifier.Echo_Algorithm,
        //     new AlgorithmRegistryEntry(
        //         AlgorithmIdentifier.Echo_Algorithm,
        //         "Echo Algorithmus",

        //         () => new EchoAlgorithm(new AlgorithmActionHandler()),
        //         AlgorithmInitiationType.Single,

        //         () => new EchoAlgorithmNodeBuilder(),

        //         () => new EchoAlgorithmNodeRenderer(),
        //         () => new EchoAlgorithmEdgeRenderer(),
        //         () => new EchoAlgoMsgDataRenderer(),
        //     )
        // ],

        //? AnotherAlgorithm Entry

    ]);


