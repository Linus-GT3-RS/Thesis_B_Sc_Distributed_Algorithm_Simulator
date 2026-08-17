import { IAlgorithmActionScheduler } from "../actions/ActionHandler.js";
import { GenericNode } from "../data/AlgoData.js";

export class UnsupportedNodeTypeError extends Error { }
export class UnsupportedMessageTypeError extends Error { }
export class InvalidAlgorithmState extends Error { }


/**
 * Receives a command to execute the algorithm
 * on the provided node, which is part of the current simulation state.
 * 
 * Changes to the simulation state can only be made
 * by issuing AlgorithmActions to the SimulationEngine.
 * 
 * For each execution request, the algorithm receives a node,
 * and its neighbors' IDs.
 * The node and its neighbor IDs represent the information available
 * to a algorithm in a real distributed system, where IDs typically map
 * to network addresses used for communication.
 */
export abstract class GenericAlgorithm {


    constructor(
        protected actionHandler: IAlgorithmActionScheduler,
    ) { }


    /**
     * Handles incoming Message for a given node
     * by issueing AlgorithmActions
     * 
     * @param receiver 
     * @param msgData 
     * @param neighborIDs 
     * @throws InvalidEntityError if Node or MessageData is of invalid type
     * @throws InvalidAlgorithmStateError if state of context is invalid
     */
    public abstract issueIncomingMessage(
        receiver: Readonly<GenericNode>,
        msgData: Readonly<unknown>,
        neighborIDs: ReadonlyArray<number>,
    ): void;


    /**
     * Handles Initiation by 
     * issueing AlgorithmActions
     * 
     * @param initiator 
     * @param neighborIDs 
     * @throws InvalidEntityError if Algorithm cannot 
     *  handle NodeType of initiator
     * @throws InvalidAlgorithmStateError if state of context is invalid
     */
    public abstract issueInitiation(
        initiator: Readonly<GenericNode>,
        neighborIDs: ReadonlyArray<number>,
    ): void;

}