import { IAlgorithmActionHandler } from "./actions/ActionHandler";
import { GenericNode } from "./data/Data";

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

    //* can handle following initiation run types
    // - one time runs and then finish
    // - parallel runs
    // - chained runs but only if previous run is finished:
    //
    // that works because
    // node stores all information it needs (no extra variables are added when cmd is created)... 
    // algorithm just needs to know which node triggers the initiaton

    // throws error
    public abstract onInitiationRequest(
        initiator: GenericNode, // TODO this is a copy? -> therefore algo has to use action to notify sim if sth changes
        neighborIDs: Array<number>,
    ): void;

}