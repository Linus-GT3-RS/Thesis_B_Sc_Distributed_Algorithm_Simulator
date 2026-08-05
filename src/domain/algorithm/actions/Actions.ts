import { GenericNode } from "../data/Data";

//* Generic Actions

export class LogAction {
    constructor(
        public msg: string
    ) { }
}


//* Message Actions

export class CreateMessageAction {
    constructor(
        public receiverID: number,
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


