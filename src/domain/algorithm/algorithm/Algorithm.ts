import { GenericNode } from "../data/AlgoData.js";

export class AlgorithmExecutionError extends Error { }

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


//! todo use systems

//! todo figure out first how can be generic 
// and also be built generic 

//! todo let msgs be generic??
// or ignore for now for simplicity





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
     * @throws {AlgorithmExecutionError}
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
     * @throws {AlgorithmExecutionError}
     */
    public abstract issueInitiation(
        initiator: Readonly<GenericNode>,
        neighborIDs: ReadonlyArray<number>,
    ): void;

}