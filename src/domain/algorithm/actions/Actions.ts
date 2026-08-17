import { GenericNode } from "../data/AlgoData.js";

//* Generic Actions

export class DoLogAction {
    constructor(
        public logMsg: string
    ) { }
}


//* Message Actions

export class SendMessageAction {
    constructor(
        public receiverId: number,
        public data: unknown,
    ) { }
}


//* Node Actions

// any property change is allowed
// except id change
export class UpdateNodeAction {
    constructor(
        public updatedNode: GenericNode
    ) { }
}


