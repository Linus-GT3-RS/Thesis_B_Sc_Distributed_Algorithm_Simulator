
export enum LogType {
    INFO,
    WARNING,
    ERROR,
}

export class NodeLog {
    constructor(
        public id: number,
        public type: LogType,
        public msg: string,
        public logger: number, // id of node (process) that issued log
    ) { }
}