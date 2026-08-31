import { CommandTypeSchema, SimulateAlgoInitCmd, SimAlgoInitCmdSchema, SimulateStepForwardCmd, idSimulateAlgorithmInitCmd, idSimStepForwardCmd as idSimulateForwardStepCmd, SimStepForwardCmdSchema } from "./gateway_data/Commands.js";
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
 * Anything can be emitted as a Domain Event
 * and leave the domain through this gateway.
 */
export abstract class IDomainEventGateway {

    /**
     * emits event to whoever is
     * listening to domain layer
     * 
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
