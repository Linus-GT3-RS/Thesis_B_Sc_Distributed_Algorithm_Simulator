import { IDomainEventGateway } from "../Controller.js";
import { IHandlerSimulateAlgoInitCmd, IHandlerSimulateForwardStepCmd, SimulateAlgoInitCmd, SimulateStepForwardCmd } from "../gateway_data/Commands.js";
import { BehaviourSimulationStoppedState } from "./state_behaviours/BehavSimStoppedState.js";

//* States
export enum DomainState {
    ConfigState,
    SimulationStoppedState,
    SimulationRunningState,
}


//* State Machine

/**
 * Acts as the central authority for determining
 * which commands can be handled in which states.
 * 
 * Receives commands and forwards them to the
 * current state's behavior executioner if the
 * current state is allowed to handle the given command.
 * 
 * If the command cannot be handled in the current
 * state, an error event is emitted.
 * 
 *? Developer Note:
 * States must be explicitly whitelisted.
 */
export class DomainStateMachine implements
    IHandlerSimulateAlgoInitCmd,
    IHandlerSimulateForwardStepCmd {

    constructor(
        private curState: DomainState,

        private simStoppedStateBehav: BehaviourSimulationStoppedState,

        private eventGateway: IDomainEventGateway,
    ) { }


    //? All possible Commands

    onSimulateAlgoInitCmd(cmd: SimulateAlgoInitCmd): void {
        switch (this.curState) {
            case DomainState.SimulationStoppedState:
                this.simStoppedStateBehav.onSimulateAlgoInitCmd(cmd);
                break;

            // case DomainState.SimulationRunningState:
            //     break;

            default:
                this.emitInvalidCmdError();
        }
    }

    onSimulateStepForwardCmd(cmd: SimulateStepForwardCmd): void {
        switch (this.curState) {
            case DomainState.SimulationStoppedState:
                this.simStoppedStateBehav.onSimulateStepForwardCmd(cmd);
                break;

            default:
                this.emitInvalidCmdError();
        }
    }


    //? Utils
    private emitInvalidCmdError(): void {
        //! todo EVENTS
    }

}