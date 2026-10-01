import type { Identifiable } from "../../../../../../common/EntityStores.js";
import { MessageData } from "../state_entities/Messages.js";
import { NodeState } from "../state_entities/Nodes.js";


//* Errors

/**
 * This error is expected to be handled by the node process.
 *
 * It represents a failure that may occur in a real-world node
 * and should therefore be handled by the 
 * Plugin Developer !
 *
 * If unhandled, the simulation crashes.
 */
export class MessageSystemError extends Error { }


//* Incoming Messages

export abstract class IEnvSystemMessageInbox {

    /**
     * @throws {MessageSystemError} if no message exist
     */
    public abstract readFirst(): Readonly<MessageData>;

}


//* Outgoing Messages

export abstract class IEnvSystemMessageOutbox {

    /**
     * sends message via tcp like communication
     * 
     * @param msg 
     * @param receiver 
     * @throws {MessageSystemError} if routing table does not contain receiver
     */
    public abstract send(msg: MessageData, receiver: number): void;

    /**
     * returns routing table of node
     */
    public abstract getNeighbors(): MapIterator<Readonly<Identifiable>>;

    public abstract getNeighborCount(): number;

}


//* LocalNodeState Data

export type MutableNodeStateKeys<N extends NodeState> =
    Exclude<keyof N, keyof NodeState> // is union

export abstract class IEnvSystemNodeState<N extends NodeState> {

    /**
     * Allows to read all node properties
     */
    public abstract get<K extends keyof N>(
        property: K
    ): Readonly<N[K]>;

    /**
     * Allows to write mutable node properties
     */
    public abstract set<K extends MutableNodeStateKeys<N>>(
        property: K, value: N[K]
    ): void;

}


//* Logging

export abstract class IEnvSystemLogging {

    public abstract logInfo(msg: string): void;
    public abstract logWarning(msg: string): void;
    public abstract logError(msg: string): void;

}