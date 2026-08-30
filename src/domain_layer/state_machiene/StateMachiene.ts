// import { GenericGraphconfig } from "../graphconfig_generic/GenGraphconfig.js";
// import { DomainCommand, LoadGraphconfigCmd as ParseGraphconfigFileCmd } from "./DomainCommands.js";
// import { CmdNotSupportedErrorEv, DomainEvent } from "./DomainEvents.js";
// import { GenericGraphconfigStateTransition, StateTransition } from "./StateTransitions.js";

// export abstract class IDomainCommandHandler {
//     abstract handleCommand(cmd: DomainCommand): void
// }

// export abstract class IDomainEventHandler {
//     abstract handleEvent(event: DomainEvent): void
// }

// export abstract class ControllerState extends IDomainCommandHandler {

//     constructor(
//         protected eventHandler: IDomainEventHandler
//     ) {
//         super();
//     }

//     abstract processCommand(cmd: DomainCommand): DomainEvent | StateTransition // TODO defaultState auf des neue anpassen

// }

// export class DefaultState extends ControllerState {
//     constructor(
//         eventHandler: IDomainEventHandler
//     ) {
//         super(eventHandler);
//     }

//     override handleCommand(cmd: DomainCommand) {
//         if (cmd instanceof ParseGraphconfigFileCmd) {
//             const builder: IGraphconfigBuilder = new GraphconfigBuilder();
//             const config: GenericGraphconfig | null = builder.buildFromFile();

//             if (config !== null) {
//                 new GenericGraphconfigStateTransition(config)
//             }
//             new ErrorEvent()
//         }
//         else {
//             this.eventHandler.handleEvent(new CmdNotSupportedErrorEv());
//         }
//     }
// }

// export class GenericGraphconfigState extends ControllerState {



// }

// export class AlgorithmGraphconfigState extends ControllerState {

// }

// export class SimulationState { }


