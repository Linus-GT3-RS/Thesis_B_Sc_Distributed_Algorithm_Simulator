
interface PresentationModelNodeLog {
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
}




export type ModelDataDetail = Map<string, string>
export type ModelStyle = Map<string, string>

// todo or move to ui?
// but then this had to be rewritten each time ui changes. kinda meh
export type PresentationModelEntityStyles = Map<string, string>


interface PresentationModelNodeState {
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




export abstract class IModelDataDetailerNodeState {

    public abstract addData(key: string, value: string): void;

}

class ModelDataDetailerNodeState {

    constructor(
        private data: Map<string, string>,
    ) { }

}

class ModelDetailProviderNodeState {

}



abstract class IModelStylistNodeState {

    public abstract setColor(color: string): void;

    public abstract setThickness(isThick: boolean): void;

}

class ModelStylistNodeState {

    constructor(
        private styles: Map<string, string>
    ) { }

}

class ModelStyleProviderNodeState {

}