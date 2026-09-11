import z from "zod";

//*
/**
 * For each entity group that shall be presented
 * a PresentationModel must exist
 */


//= Details
export const SchemaMapDataDetails = z.map(
    z.string(),
    z.union([z.string(), z.number(), z.boolean()])
);
export type MapModelDataDetails = z.infer<typeof SchemaMapDataDetails>

//= Styles
export const SchemaMapStyleDetails = z.map(
    z.string(), z.string()
);
export type MapModelStyles = z.infer<typeof SchemaMapStyleDetails>


//= NodeLog
export const SchemaPresentationModelNodeLog = z.object({
    id: z.number(), // id of presented NodeLog
    logType: z.string(),
    log: z.string(),
    idLogger: z.number()
});
export type PresentationModelNodeLog = z.infer<typeof SchemaPresentationModelNodeLog>


//= NodeState
export const SchemaPresentationModelNodeState = z.object({
    id: z.number(), // id of presented NodeState
    dataDetails: SchemaMapDataDetails,
    styles: SchemaMapStyleDetails,
});
export type PresentationModelNodeState = z.infer<typeof SchemaPresentationModelNodeState>


//= MessageState
export const SchemaPresentationModelMessageState = z.object({
    id: z.number(), // id of presented MessageState

    idSender: z.number(),
    idReceiver: z.number(),

    sendTime: z.number(),
    destinationTime: z.number(),

    typePayload: z.string(),
    dataDetails: SchemaMapDataDetails,
    styles: SchemaMapStyleDetails,
});
export type PresentationModelMessageState = z.infer<typeof SchemaPresentationModelMessageState>


//= EdgeState
export const SchemaPresentationModelEdgeState = z.object({
    id: z.number(), // id of presented EdgeState

    idNodeA: z.number(),
    idNodeB: z.number(),

    edgeType: z.string(),
    length_ms: z.number(),

    dataDetails: SchemaMapDataDetails,
    styles: SchemaMapStyleDetails,
});
export type PresentationModelEdgeState = z.infer<typeof SchemaPresentationModelEdgeState>