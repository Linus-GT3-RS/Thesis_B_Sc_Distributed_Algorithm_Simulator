import { NodeState } from "../state_entities/Nodes.js";
import { IEnvSystemMessageInbox, IEnvSystemMessageOutbox, IEnvSystemNodeState, IEnvSystemLogging } from "./EnvironmentSystems.js";

/**
 * Provides the node with access to all systems
 * to interact with its environment
 */
export interface ProcessEnvironment<N extends NodeState> {
    // provides interface to interact with
    // msgs from outside world
    // -> receiving
    in: IEnvSystemMessageInbox,

    // provides interface to interact with
    // outside world
    // -> msg sending
    out: IEnvSystemMessageOutbox,

    // provides interface to interact with
    // local date, which is the node state
    local: IEnvSystemNodeState<N>,

    // provides interface to 
    // send stuff to the admin
    up: IEnvSystemLogging,
}