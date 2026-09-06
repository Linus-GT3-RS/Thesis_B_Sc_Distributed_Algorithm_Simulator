import z from "zod";
import { PresentationModelEdgeState, PresentationModelMessageState, PresentationModelNodeLog, PresentationModelNodeState } from "../components/simulation/presentation/models/PresentationModels.js";
import { Identifiable } from "../../common/EntityStores.js";
import { NodeLog } from "../components/algorithm_plugins/api/entities/state_entities/Logs.js";

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


//? Simulation Entities

export class UpdatedNodeLogEv {
    constructor(
        public updated: PresentationModelNodeLog,
    ) { }
}

export class UpdatedNodeStateEv {
    constructor(
        public updated: PresentationModelNodeState,
    ) { }
}

export class UpdatedEdgeStateEv {
    constructor(
        public updated: PresentationModelEdgeState,
    ) { }
}

export class UpdatedMessageStateEv {
    constructor(
        public updated: PresentationModelMessageState,
    ) { }
}