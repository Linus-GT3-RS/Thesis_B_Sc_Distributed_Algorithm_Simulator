import { IDomainCommandHandler, CmdSimulateAlgoInit, CmdSimulateTimeAdvance } from "../gateways/Commands.js";
import { IDomainEventGateway } from "../gateways/EventGateway.js";
import { ErrorEv } from "../gateways/Events.js";


//* States
export enum DomainState {
    ConfigState,
    SimulationStoppedState,
    SimulationRunningState,
}


//* State Behaviour Interfaces

export type IStateBehavSimulationStopped = Pick<IDomainCommandHandler,
    "onCmdSimulateAlgoInit" | "onCmdSimulateTimeAdvance">



//* DomainController

/**
 * Is a StateMachine and therefore acts as the central 
 * whitelisting authority for determining which commands can be handled 
 * in which states.
 * 
 * Receives commands and forwards them to the
 * current state's behavior executioner.
 * 
 * If the command cannot be handled in the current
 * state, an error event is emitted.
 */
export class DomainController implements IDomainCommandHandler {

    constructor(
        private curState: DomainState,
        private eventGateway: IDomainEventGateway,

        // state behaviours
        private behavSimStopped: IStateBehavSimulationStopped,
    ) { }


    public onCmdSimulateAlgoInit(cmd: CmdSimulateAlgoInit): void {
        switch (this.curState) {
            case DomainState.SimulationStoppedState:
                this.behavSimStopped.onCmdSimulateAlgoInit(cmd);
                break;

            default:
                this.emitEvStateMachineError(cmd);
        }
    }


    public onCmdSimulateTimeAdvance(cmd: CmdSimulateTimeAdvance): void {
        switch (this.curState) {
            case DomainState.SimulationStoppedState:
                this.behavSimStopped.onCmdSimulateTimeAdvance(cmd);
                break;

            default:
                this.emitEvStateMachineError(cmd);
        }
    }


    private emitEvStateMachineError(cmd: unknown): void {
        this.eventGateway.emit(new ErrorEv(`
            Cannot handle command in current state ${this.curState}.
            Given command is ${cmd}`
        ));
    }

}