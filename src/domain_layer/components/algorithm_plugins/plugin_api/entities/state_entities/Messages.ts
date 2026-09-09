
export class MessageData {
    constructor(
        public type: string,
    ) { }
}

export class MessageState {
    constructor(
        public id: number,

        public sender: number,
        public receiver: number,

        public sendTime: number,
        public destinationTime: number,

        public data: MessageData,
    ) { }
}