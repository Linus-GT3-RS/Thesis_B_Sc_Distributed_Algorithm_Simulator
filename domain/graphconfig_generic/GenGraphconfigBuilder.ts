// import TsMap from 'ts-map'

// //* JSON Parser Interface

// export abstract class IJSONParser<T> {

//     // tries to build the Object
//     // sets default values if a value is not given
//     // - e.g. id
//     // throws error if important value is missing

//     public abstract parse(json: string): T | null;

// }


// //* GenericNode Builder

// export class GenericNodeBuilder
//     implements IJSONParser<GenericNode> {

//     public parse(json: string): GenericNode | null {
//         return null;
//     }

// }

// //* GenericEdge Builder

// export class GenericEdgeBuilder
//     implements IJSONParser<GenericEdge> {

//     public parse(json: string): GenericEdge | null {
//         return null;
//     }

// }

// //* GenericGraphconfig Builder

// export class GenericGraphconfigBuilder {

//     // throws error
//     public build(
//         json: string //?
//     ): GenericGraphconfig {
//         throw new Error();
//     }

//     // throws error
//     public processNextNode(
//         json: string, //?
//         nodeBuilder: GenericNodeBuilder,
//         nodeStore: NodeStore<GenericNode>,
//     ): void {
//         throw new Error();
//     }

//     // throws error
//     public processNextEdge(
//         json: string, //?
//         edgeBuilder: GenericEdgeBuilder,
//         nodeStore: NodeStore<GenericNode>,
//         edgeStore: EdgeStore<GenericEdge>,
//     ): void {
//         throw new Error();
//     }

// }