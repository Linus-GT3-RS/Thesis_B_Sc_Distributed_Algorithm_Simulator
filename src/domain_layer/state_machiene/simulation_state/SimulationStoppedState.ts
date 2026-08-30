// export abstract class State {

//     public abstract handle(cmd: unknown): void;

// }


// export class InitCommand {
//     constructor(
//         public initiator: number,
//     ) { }
// }

// export class StepForwadCommand {
//     constructor(
//         public delta: number,
//     ) { }
// }


// export class SimulationStoppedState implements State {

//     constructor(
//         private engine: ,
//     ) { }

//     public handle(cmd: unknown): void {
//         if (cmd instanceof InitCommand) {
//             this.handleInitCmd(cmd);
//         }
//         else if (cmd instanceof StepForwadCommand) {
//             this.handleStepForwardCmd(cmd);
//         }
//         else {
//             throw new Error(""); // todo or event?
//         }
//     }

//     public handleInitCmd(cmd: InitCommand): void {

//     }


//     public handleStepForwardCmd(cmd: StepForwadCommand): void {

//     }
// }