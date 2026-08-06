import { IAlgorithmActionHandler } from "../actions/ActionHandler.js";
import { GenericNode } from "../data/Data.js";

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

export abstract class GenericAlgorithm {

    constructor(
        public actionHandler: IAlgorithmActionHandler, // todo change public
    ) { }


    //* Message Delivery

    // throws error
    public abstract onMessageDelivery(
        receiver: GenericNode, // TODO this is a copy? -> therefore algo has to use action to notify sim if sth changes
        msgData: unknown,
        neighborIDs: Array<number>,
    ): void;


    //* Inititation Requests

    // throws error
    public abstract onInitiationRequest(
        initiator: GenericNode, // TODO this is a copy? -> therefore algo has to use action to notify sim if sth changes
        neighborIDs: Array<number>,
    ): void;

}