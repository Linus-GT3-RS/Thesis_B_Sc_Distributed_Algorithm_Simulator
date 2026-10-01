
//* Types

export type NodeState = NodeEntity
export type Node = NodeEntity

//* Impl

export class NodeEntity {
    constructor(

        /**
         * Similar to an IP address combined with a port, it is used to
         * identify and communicate with the node process
         */
        public id: number
    ) { }
}


