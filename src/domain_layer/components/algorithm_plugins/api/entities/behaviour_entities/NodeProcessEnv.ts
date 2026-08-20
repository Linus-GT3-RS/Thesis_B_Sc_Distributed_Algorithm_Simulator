import { NodeState } from "../state_entities/Nodes.js";
import { ISystemIncomingMessages, ISystemOutgoingMessages, ISystemLocalData, ISystemLogging } from "./EnvironmentSystems.js";

/**
 * Provides the node with access to all systems
 * to interact with its environment
 */
export interface NodeProcessEnvironment<N extends NodeState> {
    // provides interface to interact with
    // msgs from outside world
    // -> receiving
    in: ISystemIncomingMessages,

    // provides interface to interact with
    // outside world
    // -> msg sending
    out: ISystemOutgoingMessages,

    // provides interface to interact with
    // local date, which is the node state
    local: ISystemLocalData<N>,

    // provides interface to 
    // send stuff to the admin
    up: ISystemLogging,
}