import { StatementSync } from "node:sqlite";
import { SimulateAlgorithmInitCmd, CommandTypeSchema, isCommandError, SimulateAlgoInitCmd, SimAlgoInitCmdSchema, SimulateStepForwardCmd, idSimulateAlgorithmInitCmd, idSimStepForwardCmd as idSimulateForwardStepCmd, SimStepForwardCmdSchema } from "./messages/Commands.js";
import z from "zod";

/**
 * The domain layer runs in his own thread
 * Controller is accessor obj in this thread 
 * to this layer
 * 
 * receives cmds and queues them
 */
//! todo rename to thread controller?
// and then domain controller gets final cmd?

export class TempSimulationStoppedState { }
export class TempSimulationRunningState { }
export class TempConfigState { }

export enum DomainState {
    SimulationStoppedState,
    SimulationRunningState,
    ConfigState,
}

/**
 * validates if current state can exec
 * the given amount
 * 
 * validates if current state can request
 * the given transitiotj request
 * 
 * validates if current state can
 * emit the given events
 * 
 * is the state machiene?
 */
export class DomainStateMachine {

    constructor(
        private simStoppedState: TempSimulationStoppedState,
        private simRunningState: TempSimulationRunningState,
        private configState: TempConfigState,
        private currentState: DomainState,

        private eventGateteway: IDomainEventGateway
    ) { }

    //* Commands

    public onSimulateAlgoInitCmd(cmd: SimulateAlgoInitCmd): void {

    }

    public onSimulateStepForwardCmd(cmd: SimulateStepForwardCmd): void {

    }

    //* Events



    //? Transitions
}


/**
 * Acts as the gateway to the domain layer.
 * Only valid Domain Commands can enter the domain through this gateway.
 */
export abstract class IDomainCommandGateway {

    /** 
    * checks if given cmd is supported
    * if yes forward to state machine
    * if not emit erroe event
    * 
    */
    public abstract receiveCommand(cmd: unknown): void;

}


/**
 * Acts as the gateway out of the domain layer.
 * Only valid Domain Events can leave the domain through this gateway.
 */
export abstract class IDomainEventGateway {

    /**
     * emits the event to the listener
     * @param ev 
     */
    public abstract emit(ev: any): void;

}


export class DomainController
    implements IDomainCommandGateway, IDomainEventGateway {

    constructor(
        private stateMachiene: DomainStateMachine,
        private readonly emitEvent: (ev: any) => void,
    ) { }

    //* Commands


    public receiveCommand(cmd: unknown): void {
        try {
            const cmdid: string = CommandTypeSchema.parse(cmd).type;

            // determine specific cmd
            if (cmdid === idSimulateAlgorithmInitCmd) {
                const parsed: SimulateAlgoInitCmd =
                    SimAlgoInitCmdSchema.parse(cmd);
                this.stateMachiene.onSimulateAlgoInitCmd(parsed);
            }
            else if (cmdid === idSimulateForwardStepCmd) {
                const parsed: SimulateStepForwardCmd =
                    SimStepForwardCmdSchema.parse(cmd);
                this.stateMachiene.onSimulateStepForwardCmd(parsed);
            }
            else {
                // cmd parsing error ev: unknown cmd
            }
        }
        catch (error) {
            if (error instanceof z.ZodError) {
                // cmd parsing error ev: invalid cmd data
            }
            else { // unknown error
                throw error; //?
            }
        }
    }

    //* Events 

    //! todo gets ev
    // wraps ev and emits that
    // -> sets event type
    public emit(ev: any): void {
        if (ev.type === "ev1") {

        }
        else {
            // event emit error ev: unknown event
        }

    }

}
