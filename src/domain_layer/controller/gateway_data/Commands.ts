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


//* SimulateInit
/**
 * Simulates what happens when a node
 * initializes the algorithm.
 */
export const idSimulateAlgorithmInitCmd: string = "SimulateAlgorithmInitCmd";

export const SimAlgoInitCmdSchema = z.object({
    initiator: z.number()
});
export type SimulateAlgoInitCmd = z.infer<typeof SimAlgoInitCmdSchema>

export interface IHandlerSimulateAlgoInitCmd {
    onSimulateAlgoInitCmd(cmd: SimulateAlgoInitCmd): void;
}


//* StepForward
/**
 * Simulates time advancement.
 * The simulation runs until the target time is reached.
 */
export const idSimStepForwardCmd: string = "SimStepForwardCmd"

export const SimStepForwardCmdSchema = z.object({
    delta: z.number()
});
export type SimulateStepForwardCmd = z.infer<typeof SimStepForwardCmdSchema>

export interface IHandlerSimulateForwardStepCmd {
    onSimulateStepForwardCmd(cmd: SimulateStepForwardCmd): void;
}


// //* Run

// export const RunCmdZodSchema = z.object({

//     initiator: z.number()

// });

// export type InitiationCmd = z.infer<typeof InitiationCmdZodSchema>
