import { Identifiable } from "../../common/EntityStores.js";

/**
 * Lists all Log Actions
 * available to Algorithm
 */
export abstract class ILogActionHandler {

    public abstract log(msg: string): void;

}


/**
 * Lists all Message Actions
 * available to Algorithm
 */
export abstract class IMessageActionHandler {

    public abstract send(msg: unknown, receiver: Identifiable): void;

}


/**
 * Lists all Node Actions
 * available to Algorithm
 */
// export abstract class INodeActionHandler {

//     public abstract set(): void;

// }