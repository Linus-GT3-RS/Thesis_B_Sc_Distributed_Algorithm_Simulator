export type ModelDataDetail = Map<string, string>
export type ModelStyle = Map<string, string>


export class PresentationModelNodeLog {
    constructor(
        public idEntity: number,

        public type: string,
        public log: string,

        public logger: number,
    ) { }
}


export class PresentationModelNodeState {
    constructor(
        public idEntity: number,

        public dataDetails: ModelDataDetail,
        public styles: ModelStyle,
    ) { }
}


export class PresentationModelEdgeState {
    constructor(
        public idEntity: number,

        public nodeA: number,
        public nodeB: number,

        public length_ms: number,
        public type: string,

        public dataDetails: ModelDataDetail,
        public styles: ModelStyle,
    ) { }
}


export class PresentationModelMessageState {
    constructor(
        public idEntity: number,

        public sender: number,
        public receiver: number,

        public sendTime: number,
        public destinationTime: number,

        public dataDetails: ModelDataDetail,
        public styles: ModelStyle,
    ) { }
}

