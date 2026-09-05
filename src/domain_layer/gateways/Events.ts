import z from "zod";
import { PresentationModelNodeLog } from "../components/simulation/presentation/models/PresentationModels.js";

//* Gateway Event Message

export const SchemaEventMessage = z.object({
    type: z.string(),
    event: z.unknown(),
});

export type EventMessage = z.infer<typeof SchemaEventMessage>



//* Events

export class ErrorEv {
    constructor(
        public error: string,
    ) { }
}


export class NodeLogUpdatedEv {
    constructor(
        public model: PresentationModelNodeLog
    ) { }
}