import * as z from "zod";

//* Base
export const CommandSchema = z.object({
    type: z.string(),
});
export type CommandBase = z.infer<typeof CommandSchema>

//* Init
export const AlgoInitiationCmdSchema = z.object({
    initiator: z.number()
});
export type AlgoInitiationCmd = z.infer<typeof AlgoInitiationCmdSchema>

// //* Run
// export const RunCmdZodSchema = z.object({
//     initiator: z.number()
// });
// export type InitiationCmd = z.infer<typeof InitiationCmdZodSchema>


//* Step
export const SimStepForwardCmdSchema = z.object({
    delta: z.number() //? todo change later? or just let it that way and when doing run just send timescale each time it changes
});
export type SimStepForwardCmd = z.infer<typeof SimStepForwardCmdSchema>