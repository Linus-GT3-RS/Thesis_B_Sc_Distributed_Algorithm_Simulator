
// lists all existing algorithms
export enum AlgorithmPluginIdentifier {
    Echo_Algorithm
}


//* Algorithm RegistryEntry

export class AlgorithmRegistryEntry {
    constructor(
        public algorithm: AlgorithmPluginIdentifier,
        public displayName: string,

        public getAlgorithm: () => GenericNodeProcess,
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
    new Map<AlgorithmPluginIdentifier, AlgorithmRegistryEntry>([

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


