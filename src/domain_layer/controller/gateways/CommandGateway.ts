import z from "zod";
import { IDomainEventGateway } from "./EventGateway.js";
import { CmdSimulateAlgoInit, CmdSimulateTimeAdvance, CommandMessage, IDomainCommandHandler, SchemaCmdSimulateAlgoInit, SchemaCmdSimulateTimeAdvance, SchemaCommandMessage } from "./gateway_data/Commands.js";
import { ErrorEv } from "./gateway_data/Events.js";


export abstract class IDomainCommandGateway {

    /** 
     * Only valid DomainCommands can enter 
     * the domain through this DomainCommandGateway.
     * 
     * If an invalid cmd is received, an
     * ErrorEv will be emitted
     * 
    */
    public abstract receiveCommand(cmd: unknown): void;

}


//! todo schedules cmd in controller?
// or schedules cmd internally
// and then calls domain layer to handle? 
// and domain controller is a state machinee

//! => or controller responsible for scheduling and queing
// stuff then?

//! => prolly makes sense for gateway to queue stuff
// and schedule it right
// ... and state machine would be called controller...
// but that is a state machiene

export class DomainCommandGateway implements IDomainCommandGateway {

    constructor(
        private handler: IDomainCommandHandler,
        private eventGateway: IDomainEventGateway,
    ) { }

    public receiveCommand(cmdmsg: unknown): void {
        try {
            // check if cmd is valid CommandMessage
            const vmsg: CommandMessage = SchemaCommandMessage.parse(cmdmsg);

            if (vmsg.type === "CmdSimulateAlgoInit") {
                const validatedCmd: CmdSimulateAlgoInit =
                    SchemaCmdSimulateAlgoInit.parse(vmsg.command);
                this.handler.onCmdSimulateAlgoInit(validatedCmd);
            }
            else if (vmsg.type === "CmdSimulateTimeAdvance") {
                const vcmd: CmdSimulateTimeAdvance =
                    SchemaCmdSimulateTimeAdvance.parse(vmsg.command);
                this.handler.onCmdSimulateTimeAdvance(vcmd);
            }
            //
            //? whitelist more commands here
            //
            else {
                this.emitInvalidCommandMessageEv(cmdmsg);
            }
        }
        catch (error) {
            if (error instanceof z.ZodError) {
                this.emitInvalidCommandMessageEv(cmdmsg);
            }
            else {
                throw error;
            }
        }
    }


    private emitInvalidCommandMessageEv(cmdmsg: unknown): void {
        this.eventGateway.emit(new ErrorEv(
            `Received invalid DomainCommandMessage at DomainCommandGateway.
            Command is: ${cmdmsg}`
        ));
    }

}