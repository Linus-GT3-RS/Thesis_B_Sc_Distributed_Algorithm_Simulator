// // import { GenericAlgorithmProtocol } from "./domain/algorithm/algorithm/AlgorithmProtocol.js";
// // import { GenericNode } from "./domain/algorithm/data/AlgoData.js";
// // import { EchoAlgorithmNode } from "./domain/algorithm_impl/echo_algorithm/EchoAlgoData.js";
// // import { EchoAlgorithmProtocol } from "./domain/algorithm_impl/echo_algorithm/EchoAlgoProtocol.js";
// // import { CommunicationSystem } from "./domain/simulation/action_handling/CommunicationSystem.js";
// // import { LogSystem } from "./domain/simulation/action_handling/LogSystem.js";
// // import { NodeSystem } from "./domain/simulation/action_handling/NodeSystem.js";

// // abstract class IMiniEngine {
// //     public abstract dosth(): void;
// // }

// // class MyMiniEngine<N extends GenericNode>
// //     implements IMiniEngine {

// //     constructor(
// //         // private nodesystem: NodeSystem<N>,
// //     ) { }

// //     public dosth(): void {

// //     }
// // }


// // class RegistryEntry<N extends GenericNode> {

// // }

// // class build {

// //     build(algo: string): IMiniEngine {
// //         //! algo developer has to 
// //         // make this small if
// //         if (algo === "echo") {
// //             //! uses his registry entry here
// //             // -> defines all types for my generell function
// //             return this.getWrapper(
// //                 new RegistryEntry<EchoAlgorithmNode>()
// //             );
// //         }
// //         throw Error();
// //         // else {
// //         //     // ...
// //         // }
// //     }
// //     // 


// //     getWrapper<N extends GenericNode>(entry: RegistryEntry<N>): IMiniEngine {
// //         return new MyMiniEngine<N>();
// //     }
// // }



// class AMessage {
//     constructor(
//         public name: string,
//     ) { }
// }

// class BMessage {
//     constructor(
//         public name: string,
//         public age: number
//     ) { }
// }

// // class CMessage {
// //     constructor(
// //     ) { }
// // }



// class Handler {

//     onA(msg: AMessage): void {
//     }

//     onB(msg: BMessage): void {
//     }

//     onC(msg: CMessage): void {
//     }

// }


// type HandlerMap<MsgType> = {
//     [K in MsgType]: (msg: K) => void;
// };



// interface MyABCHandler {
//     onAMsg: (msg: AMessage) => void,
//     onBMsg: (msg: BMessage) => void,
//     onCMsg: (msg: CMessage) => void,
// }



// type ABCMessage =
//     AMessage
//     | BMessage
// // | CMessage

// class test {

//     //! need sth that exists during runtime
//     // private map = 

//     handle<K extends ABCMessage>(msg: K): void {

//     }

// }

// new test().handle(new AMessage(""))





// type MessageHandler<Messages> =

//     class GenProtocol < MessageType > {

//         private msgHandler: MessageHandler<Messages>;

//         public handle(msg: MessageType): void {

//         }

//     }


// class Child implements Parent<EchoProcotolMessage> {

// }


// class Sim<MsgType> {

//     private msg: MsgType;



// }



