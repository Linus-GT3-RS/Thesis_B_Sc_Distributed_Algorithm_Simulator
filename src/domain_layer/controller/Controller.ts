import { InitAlgorithmCmd, CommandTypeSchema, isCommandError, InitAlgorithmCmdData, InitAlgorithmCmdDataSchema } from "./messages/Commands.js";

/**
 * The domain layer runs in his own thread
 * Controller is accessor obj in this thread 
 * to this layer
 * 
 * receives cmds and queues them
 */
//! todo rename to thread controller?
// and then domain controller gets final cmd?
export class DomainController {

    constructor(
        // state machine
        // eventListener

        // todo queue?
    ) { }


    public scheduleCommand() {
        //! loop in here?
        // also async stuff 
    }


    public processCommand(cmd: unknown): void {
        try {
            const cmdtype: string = CommandTypeSchema.parse(cmd).type;

            // determine specific cmd
            if (cmdtype === InitAlgorithmCmd.stype) {
                const parsed: InitAlgorithmCmdData =
                    InitAlgorithmCmdDataSchema.parse(cmd);

            }
            else {
                //? do what
            }

        }
        catch (error) {
            if (isCommandError(error)) {

            }
            throw error; //? todo rethrow? or err msg
        }
    }

}