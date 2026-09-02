import * as z from "zod";

//* Gateway CommandMessage

export const SchemaCommandMessage = z.object({
    type: z.string(),
    command: z.unknown(),
});

export type CommandMessage = z.infer<typeof SchemaCommandMessage>



//* Domain CommandHandler

export abstract class IDomainCommandHandler {

    /**
    * Simulates what happens when a node
    * initializes the algorithm.
    */
    public abstract onCmdSimulateAlgoInit(cmd: CmdSimulateAlgoInit): void;


    /**
     * Simulates time advancement.
     * The simulation runs until the target time is reached.
     */
    public abstract onCmdSimulateTimeAdvance(cmd: CmdSimulateTimeAdvance): void;

}


//* ---------------------------- Commands

export const SchemaCmdSimulateAlgoInit = z.object({
    initiator: z.number()
});
export type CmdSimulateAlgoInit = z.infer<typeof SchemaCmdSimulateAlgoInit>


export const SchemaCmdSimulateTimeAdvance = z.object({
    delta: z.number()
});
export type CmdSimulateTimeAdvance = z.infer<typeof SchemaCmdSimulateTimeAdvance>

