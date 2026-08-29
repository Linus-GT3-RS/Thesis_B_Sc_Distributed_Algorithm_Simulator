import * as z from "zod";

//* Errors

export function isCommandError(err: unknown): boolean {
    return err instanceof z.ZodError;
}


//* Base
export const CommandTypeSchema = z.object({
    type: z.string(),
});
export type CommandType = z.infer<typeof CommandTypeSchema>


//* Init

export const InitAlgorithmCmdDataSchema = z.object({
    initiator: z.number()
});
export type InitAlgorithmCmdData = z.infer<typeof InitAlgorithmCmdDataSchema>

export class InitAlgorithmCmd
    implements CommandType, InitAlgorithmCmdData {

    public static readonly stype = "AlgorithmInitiationCmd";
    public readonly type: string = InitAlgorithmCmd.stype;

    constructor(
        public initiator: number
    ) { }

}



// //* Run
// export const RunCmdZodSchema = z.object({
//     initiator: z.number()
// });
// export type InitiationCmd = z.infer<typeof InitiationCmdZodSchema>


// //* Step
// export const SimStepForwardCmdSchema = z.object({
//     delta: z.number() //? todo change later? or just let it that way and when doing run just send timescale each time it changes
// });
// export type SimStepForwardCmd = z.infer<typeof SimStepForwardCmdSchema>