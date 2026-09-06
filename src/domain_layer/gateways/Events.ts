import z from "zod";
import { PresentationModelEdgeState, PresentationModelMessageState, PresentationModelNodeLog, PresentationModelNodeState } from "../components/simulation/entity_presentation/models/PresentationModels.js";

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


//= Simulation Entities

export class CreatedNodeLogEv {
    constructor(
        public model: PresentationModelNodeLog,
    ) { }
}

export class CreatedNodeStateEv {
    constructor(
        public model: PresentationModelNodeState,
    ) { }
}

export class UpdatedNodeStateEv {
    constructor(
        public updated: PresentationModelNodeState,
    ) { }
}

export class CreatedEdgeStateEv {
    constructor(
        public model: PresentationModelEdgeState,
    ) { }
}

export class UpdatedEdgeStateEv {
    constructor(
        public updated: PresentationModelEdgeState,
    ) { }
}

export class CreatedMessageStateEv {
    constructor(
        public model: PresentationModelMessageState,
    ) { }
}