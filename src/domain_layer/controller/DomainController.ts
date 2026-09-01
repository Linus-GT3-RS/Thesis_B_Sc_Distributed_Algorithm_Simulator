


//* States
export enum DomainState {
    ConfigState,
    SimulationStoppedState,
    SimulationRunningState,
}


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
 * 
 */
export class DomainController implements
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