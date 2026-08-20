import { ISystemLogging, ISystemOutgoingMessages, ISystemLocalData } from "../actions/ActionHandler.js";
import { GenericNode, GenericMessageData } from "../data/AlgoData.js";

/**
 * Thrown when the developer encounters an unexpected or invalid
 * situation caused by an implementation error.
 */
export class AlgorithmExecutionError extends Error { }




/**
 * Represents the running process of a node.
 *
 * The process executes the node's algorithm and interacts with the
 * world through its node environment.
 */
export abstract class GenericNodeProcess
    <N extends GenericNode> {

    constructor(
        protected readonly logSystem: ISystemLogging,
        protected readonly comSystem: ISystemOutgoingMessages,
        protected readonly nodeSystem: ISystemLocalData<N>,
    ) { }


    /**
     * Execs Protocol for Incoming Message on a Node
     * @throws {AlgorithmExecutionError} if invalid state // TODO are more thrown? or ignore them
     */
    public abstract onMessage(
        msgData: Readonly<GenericMessageData>,
    ): void;


    /**
     * Executes Protocol for Initiation on a Node
     * @throws {AlgorithmExecutionError} if invalid state // TODO are more thrown? or ignore them
     */
    public abstract onInitiation(
    ): void;

}