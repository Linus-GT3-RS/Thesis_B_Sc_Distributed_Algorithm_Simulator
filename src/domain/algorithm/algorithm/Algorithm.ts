import { IAlgorithmActionHandler } from "../actions/ActionHandler.js";
import { GenericNode } from "../data/AlgoData.js";

// Real-world analogy:
//
// Before execution, an administrator configures the distributed system.
// Every node receives:
// - its own unique identifier.
// - a list of its neighbors' identifiers.
//
// In a real network, these identifiers typically map to network addresses
// (e.g. IP:Port), allowing a node to communicate with its neighbors without
// knowing anything about the rest of the network.

export class UnsupportedNodeTypeError extends Error { }
export class UnsupportedMessageTypeError extends Error { }




/**
 * Receives a command to execute the algorithm
 * on the provided node, which is part of the current simulation state.
 * 
 * Changes to the simulation state can only be made
 * by issuing AlgorithmActions to the SimulationEngine.
 */
export abstract class GenericAlgorithm {


    constructor(
        protected actionHandler: IAlgorithmActionHandler,
    ) { }


    /**
     * Handles incoming Message for a given node
     * by issueing AlgorithmActions
     * 
     * @param receiver 
     * @param msgData 
     * @param neighborIDs 
     * @throws InvalidEntityError if Node or MessageData 
     *  is of invalid type
     */
    public abstract execProtocolOnMessage(
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
     */
    public abstract execProtocolOnInitiation(
        initiator: Readonly<GenericNode>,
        neighborIDs: ReadonlyArray<number>,
    ): void;

}