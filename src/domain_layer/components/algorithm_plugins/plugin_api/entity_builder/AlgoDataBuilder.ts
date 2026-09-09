// import TinyQueue from "tinyqueue";
// import { GenericMessage, GenericNodeState } from "./AlgoData.js";

// //* AlgorithmNodeData Builder

// export abstract class IAlgorithmNodeBuilder {


//     /** Builds a Node
//      * 
//      * @param json - does stuff
//      * @throws Error
//      */
//     public abstract build(json: string): GenericNodeState;

// }

// //* GenericMessageQueue Builder

// export class MessageQueueBuilder {

//     // Queue is sorted ascending by delivery time of msg, 
//     // so that the first message is always the next to be delivered.
//     public build(): TinyQueue<GenericMessage> {
//         return new TinyQueue(
//             [],
//             (a: GenericMessage, b: GenericMessage) => {
//                 return a.destinationTime - b.destinationTime;
//             }
//         );
//     }

// }