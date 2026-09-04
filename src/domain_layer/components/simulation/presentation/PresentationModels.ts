export type ModelDataDetail = Map<string, string>
export type ModelStyle = Map<string, string>


export interface PresentationModelNodeLog {
    logId: number,

    type: string,
    log: string,

    logger: number,
}


interface PresentationModelEdgeState {
    edgeId: number,

    nodeA: number,
    nodeB: number

    length_ms: number,
    type: string

    styles: ModelStyle,
}


export interface PresentationModelNodeState {
    nodeId: number,

    dataDetails: ModelDataDetail,
    styles: ModelStyle,
}

interface PresentationModelMessageState {
    messageId: number,

    sender: number,
    receiver: number,

    sendTime: number,
    destinationTime: number,

    dataDetails: ModelDataDetail,
    styles: ModelStyle,
}

