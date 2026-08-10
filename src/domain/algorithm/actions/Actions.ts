import { GenericNode } from "../data/AlgoData.js";

//* Generic Actions

export class LogAction {
    constructor(
        public logMsg: string
    ) { }
}


//* Message Actions

export class CreateMessageAction {
    constructor(
        public senderId: number,
        public receiverId: number,
        public data: unknown,
    ) { }
}


//* Node Actions

// todo
export class UpdateNodeAction {
    constructor(
        public node: GenericNode
    ) { }
}


