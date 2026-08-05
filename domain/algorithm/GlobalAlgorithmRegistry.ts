import TsMap from "ts-map";
import { EchoAlgorithmNodeBuilder } from "../algorithm_impl/echo_algorithm/EchoAlgoBuilder";
import { EchoAlgoMsgDataRenderer, EchoAlgorithmEdgeRenderer, EchoAlgorithmNodeRenderer } from "../algorithm_impl/echo_algorithm/EchoAlgoRenderer";
import { EchoAlgorithm } from "../algorithm_impl/echo_algorithm/EchoAlgorithm";
import { AlgorithmActionHandler, IAlgorithmActionHandler } from "./actions/ActionHandler";
import { GenericAlgorithm } from "./Algorithm";
import { IAlgorithmNodeBuilder } from "./data/DataBuilder";
import { IAlgorithmEdgeRenderer, IAlgorithmMessageDataRenderer, IAlgorithmNodeRenderer } from "./rendering/Renderer";

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

        public getNodeBuilder: () => IAlgorithmNodeBuilder,

        public getNodeRenderer: () => IAlgorithmNodeRenderer,
        public getEdgeRenderer: () => IAlgorithmEdgeRenderer,
        public getMessageDataRenderer: () => IAlgorithmMessageDataRenderer,
    ) { }
}


//* Algorithm Registry

// todo readonly
export const algorithmRegistry =
    new TsMap<AlgorithmIdentifier, AlgorithmRegistryEntry>([

        //? EchoAlgorithm Entry
        [
            AlgorithmIdentifier.Echo_Algorithm,
            new AlgorithmRegistryEntry(
                AlgorithmIdentifier.Echo_Algorithm,
                "Echo Algorithmus",

                () => new EchoAlgorithm(new AlgorithmActionHandler()),

                () => new EchoAlgorithmNodeBuilder(),

                () => new EchoAlgorithmNodeRenderer(),
                () => new EchoAlgorithmEdgeRenderer(),
                () => new EchoAlgoMsgDataRenderer(),
            )
        ],

        //? AnotherAlgorithm Entry

    ]);


