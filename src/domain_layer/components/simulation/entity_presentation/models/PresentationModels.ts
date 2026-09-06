export type ModelDataDetail = Map<string, string>
export type ModelStyle = Map<string, string>


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

        public length_ms: number,
        public edgeType: string,

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

        public dataDetails: ModelDataDetail,
        public styles: ModelStyle,
    ) { }
}

