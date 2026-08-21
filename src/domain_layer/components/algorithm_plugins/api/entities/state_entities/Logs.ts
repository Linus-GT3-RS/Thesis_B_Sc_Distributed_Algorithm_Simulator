import { Identifiable } from "../../../../../../common/EntityStores.js";

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
        public issuerNode: number,
    ) { }
}