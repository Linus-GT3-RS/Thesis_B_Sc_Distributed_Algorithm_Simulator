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
