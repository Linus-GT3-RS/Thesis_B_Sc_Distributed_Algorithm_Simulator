import z from "zod";

//* Gateway Event Message

export const SchemaEventMessage = z.object({
    type: z.string(),
    event: z.unknown(),
});

export type EventMessage = z.infer<typeof SchemaEventMessage>



//* Events

export class ErrorEv {
    constructor(
        error: string,
    ) { }
}