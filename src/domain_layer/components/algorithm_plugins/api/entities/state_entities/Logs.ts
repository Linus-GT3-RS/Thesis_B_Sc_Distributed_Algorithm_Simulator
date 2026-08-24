
export enum LogType {
    INFO,
    WARNING,
    ERROR,
}

export class NodeProcessLog {
    constructor(
        public id: number,
        public type: LogType,
        public msg: string,
        public nodeProcess: number, // id of node (process) that issued log
    ) { }
}