import { NodeState } from "../state_entities/Nodes.js";
import type { NodeProcessEnvironment } from "./NodeProcessEnv.js";

//! todo
// the initiation rules would also be obsolete that way
// cause irl u cant know if someelse also did init
// algo has to handle that
// ... my cur initTypes could just be "info for user"... which would
// also be displayed irl.. "hey this algo is not for parallel... do 
// you know what youre doing ?? "

// defines how the State? handles
// an AlgorithmInitiationRequest
export enum AlgorithmInitiationTypes {

    // After the first InitiationRequest, no more
    // can be accepted.
    // The Simulation has to be restarted to set
    // a new InitiationRequest
    Single,

    // The number of InitiationRequests is not limited
    // and after the first InitReq more can be sent
    // no matter if the Engine is running or stopped
    Parallel,

    // after finished another run without 
    // restart is possible
    // Chained

};


/**
 * Represents a running node process in real world
 * 
 * Gets active on
 * Incoming Message
 * Admin Initiation Instruction
 * and reacts according to its algorithm protocol
 * 
 * Uses its environment to perform actions
 */
export abstract class INodeProcess<N extends NodeState> {

    public abstract onInitiationInstruction(
        env: NodeProcessEnvironment<N>
    ): void;


    public abstract onIncomingMessage(
        env: NodeProcessEnvironment<N>
    ): void;

}




