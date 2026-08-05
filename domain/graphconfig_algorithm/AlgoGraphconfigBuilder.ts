
// //* AlgorithmGraphconfig Builder

// export class AlgorithmGraphconfigBuilder<
//     NodeDataType extends AlgorithmNodeData
// > {

//     // throws error
//     public build(
//         genericConfig: GenericGraphconfig,
//         dataBuilder: IAlgorithmNodeDataBuilder<NodeDataType>,
//         algorithm: AlgorithmIdentifier,
//     ): AlgorithmGraphconfig<NodeDataType> {
//         throw new Error();
//     }

//     // throws error
//     public processNextNode(
//         generic: GenericNode,
//         dataBuilder: IAlgorithmNodeDataBuilder<NodeDataType>,
//         nodeStore: NodeStore<AlgorithmNode<NodeDataType>>,
//     ): void {
//         throw new Error();
//     }

//     // throws error
//     public processNextEdge(
//         generic: GenericEdge,
//         nodeStore: NodeStore<AlgorithmNode<NodeDataType>>,
//         edgeStore: EdgeStore<AlgorithmEdge<NodeDataType>>,
//     ): void {
//         throw new Error();
//     }

// }