import { MessageData } from "../entities/state_entities/Messages.js";
import { NodeState } from "../entities/state_entities/Nodes.js";
import { PresentationDetail } from "./EntityPresentationDetails.js";

/**
 * Generic entity state data is always available to the user interface.
 * 
 * A PresentationDetailProvider provides additional
 * presentation data for an entity on its state that is unique to 
 * a specific plugin algorithm
 */


//* Errors

export class PresentationDetailProviderError extends Error { }


//* Detail Providers

export abstract class INodeStatePresentationDetailProvider {

    /**
     * Provides details on how to present the NodeState
     * @param node 
     * @throws {PresentationDetailProviderError} if type is unknown
     */
    public abstract provide(state: Readonly<NodeState>): Array<PresentationDetail>;

}


export abstract class IMsgDataPresentationDetailProvider {

    /**
         * Provides details on how to present the MessageData
         * @param data 
         * @throws {PresentationDetailProviderError} if type is unknown
         */
    public abstract provide(data: Readonly<MessageData>): Array<PresentationDetail>;

}


export abstract class IEdgePresentationDetailProvider {

    /**
     * Provides details on how to present the Edge
     * @param edge 
     * @throws {PresentationDetailProviderError} if type is unknown
     */
    public abstract provide(
        node1: Readonly<NodeState>,
        node2: Readonly<NodeState>
    ): Array<PresentationDetail>;

}

