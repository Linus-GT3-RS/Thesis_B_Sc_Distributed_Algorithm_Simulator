import { Identifiable } from "../../../../../../common/EntityStores.js";
import { MessageData } from "../state_entities/Messages.js";
import { NodeState } from "../state_entities/Nodes.js";


//* Errors

/**
 * This error is expected to be handled by the node process.
 *
 * It represents a failure that may occur in a real-world node
 * and should therefore be handled by the process developer.
 *
 * If unhandled, the simulation crashes.
 */
export class MessageSystemError extends Error { }


//* Incoming Messages

export abstract class ISystemIncomingMessages {

    /**
     * On first call marks the message as received
     * If this call does not happen, the message will be delivered
     * indefinitly
     * 
     * @throws {MessageSystemError} if no message is pending
     */
    public abstract peekPendingMessage(): Readonly<MessageData>;

}


//* Outgoing Messages

/**
 * Configured neighbors are assumed to be configured 
 * correctly by the system admin. 
 * 
 */
export abstract class IOutgoingMessageSystem {

    /**
     * sends message via udp like communication
     * A sent message is delivered if the receiving node is online.
    *  If the receiving node is offline, the message is lost.
    * 
     * @param msg 
     * @param receiver 
     * @throws {MessageSystemError} if sender does not know receiver
     */
    public abstract send(msg: MessageData, receiver: number): void;

    public abstract getNeighborCount(): number;
    public abstract getNeighborIterator(): MapIterator<Readonly<Identifiable>>;

}


//* LocalNodeState Data

export type MutableNodeStateKeys<N extends NodeState> =
    Exclude<keyof N, keyof NodeState> // is union

export abstract class ILocalDataEnvSystem<N extends NodeState> {

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

export abstract class ILoggingSystem {

    public abstract logInfo(msg: string): void;
    public abstract logWarning(msg: string): void;
    public abstract logError(msg: string): void;

}