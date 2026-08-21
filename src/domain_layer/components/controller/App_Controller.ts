
// export class TransitionGenGraphconfigState {

// }

// export class TransitionAlgoGraphconfigState {

// }

// export class TransitionRunningSimState {

// }

// export class TransitionStoppedSimState {

// }

// //? runs in a WebWorker Thread
// // receives cmds via WebWorker Thread CmdQueue
// export class DomainController {

//     private state: unknown;

//     // private eventListener: unknown;

//     public handleCommand(cmd: unknown) {
//         if (cmd instanceof AlgorithmInitCmd
//             && this.state instanceof IHandlerAlgorithmInitCmd
//         ) {
//             this.state.handleCmd(cmd);
//         }
//         // else if(){}

//         console.log(`Cannot handle cmd=${cmd}. Current state is: ${this.state}`); // todo ev
//     }

// }