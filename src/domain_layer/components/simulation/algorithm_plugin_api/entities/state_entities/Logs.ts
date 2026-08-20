
export class NodeLog {
    constructor(
        public id: number,
        public issuerNode: Identifiable,
        public msg: string,
    ) { }
}