export type ModelDataDetail = Map<string, string | number | boolean>
export type ModelStyle = Map<string, string>

//*
/**
 * For each entity group that shall be presented
 * a PresentationModel must exist
 */

export class PresentationModelNodeLog {
    constructor(
        public idNodeLog: number,

        public logType: string,
        public log: string,

        public idLogger: number,
    ) { }
}


export class PresentationModelNodeState {
    constructor(
        public idNodeState: number,

        public dataDetails: ModelDataDetail,
        public styles: ModelStyle,
    ) { }
}


export class PresentationModelEdgeState {
    constructor(
        public idEdgeState: number,

        public idNodeA: number,
        public idNodeB: number,
        public edgeType: string,

        public length_ms: number,

        public dataDetails: ModelDataDetail,
        public styles: ModelStyle,
    ) { }
}


export class PresentationModelMessageState {
    constructor(
        public idMessageState: number,

        public idSender: number,
        public idReceiver: number,

        public sendTime: number,
        public destinationTime: number,

        public typePayload: string,

        public dataDetails: ModelDataDetail,
        public styles: ModelStyle,
    ) { }
}

