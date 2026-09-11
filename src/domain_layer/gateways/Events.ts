import z from "zod";
import { type PresentationModelNodeLog, type PresentationModelNodeState, type PresentationModelEdgeState, type PresentationModelMessageState, SchemaPresentationModelNodeLog, SchemaPresentationModelNodeState, SchemaPresentationModelEdgeState, SchemaPresentationModelMessageState } from "../components/simulation/entity_presentation/models/PresentationModels";

//* Gateway Event Message

export const SchemaEventMessage = z.object({
    type: z.string(),
    event: z.unknown(),
});

export type EventMessage = z.infer<typeof SchemaEventMessage>



//* Events

//= Errors
export class ErrorEv {
    constructor(
        public error: string,
    ) { }
}
export const SchemaErrorEv = z.object({
    error: z.string(),
});
export type TypeErrorEv = z.infer<typeof SchemaErrorEv>


//* Simulation Entities

//= NodeLog
export class CreatedNodeLogEv {
    constructor(
        public model: PresentationModelNodeLog,
    ) { }
}
export const SchemaEvCreatedNodeLog = z.object({
    model: SchemaPresentationModelNodeLog,
});
export type TypeEvCreatedNodeLog = z.infer<typeof SchemaEvCreatedNodeLog>


//= NodeState
export class CreatedNodeStateEv {
    constructor(
        public model: PresentationModelNodeState,
    ) { }
}
export const SchemaEvCreatedNodeState = z.object({
    model: SchemaPresentationModelNodeState,
});
export type TypeEvCreatedNodeState = z.infer<typeof SchemaEvCreatedNodeState>


export class UpdatedNodeStateEv {
    constructor(
        public updated: PresentationModelNodeState,
    ) { }
}
export const SchemaEvUpdatedNodeState = z.object({
    updated: SchemaPresentationModelNodeState,
});
export type TypeEvUpdatedNodeState = z.infer<typeof SchemaEvUpdatedNodeState>


//= EdgeState
export class CreatedEdgeStateEv {
    constructor(
        public model: PresentationModelEdgeState,
    ) { }
}
export const SchemaEvCreatedEdgeState = z.object({
    model: SchemaPresentationModelEdgeState
});
export type TypeEvCreatedEdgeState = z.infer<typeof SchemaEvCreatedEdgeState>

export class UpdatedEdgeStateEv {
    constructor(
        public updated: PresentationModelEdgeState,
    ) { }
}
export const SchemaEvUpdatedEdgeState = z.object({
    updated: SchemaPresentationModelEdgeState
});
export type TypeEvUpdatedEdgeState = z.infer<typeof SchemaEvUpdatedEdgeState>


//= MessageState
export class CreatedMessageStateEv {
    constructor(
        public model: PresentationModelMessageState,
    ) { }
}
export const SchemaEvCreatedMessageState = z.object({
    model: SchemaPresentationModelMessageState,
});
export type TypeEvCreatedMessageState = z.infer<typeof SchemaEvCreatedMessageState>