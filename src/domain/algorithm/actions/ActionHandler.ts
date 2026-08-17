import { Identifiable } from "../../common/EntityStores.js";
import { DoLogAction, SendMessageAction, UpdateNodeAction } from "./Actions.js";

export type AlgorithmAction =
    DoLogAction
    | SendMessageAction
    | UpdateNodeAction

export abstract class IAlgorithmActionScheduler {

    /**
     * Enqueues given action
     * @param act
     */
    public abstract scheduleAction(act: AlgorithmAction): void;

}

export abstract class IAlgorithmActionHandler {

    /**
     * 
     * @param act 
     * @throws todo                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              */
    public abstract handle(act: AlgorithmAction, issuerNode: Identifiable): void;

}

// export abstract class IAlgorithmActionManager {

//     public abstract getDrainIterator(): IterableIterator<unknown>;

// }

// export class AlgorithmActionHandler
//     implements
//     IHandlerAlgorithmAction,
//     IAlgorithmActionManager {

//     constructor(
//         private queue: Queue<unknown>,
//     ) { }

//     public handleAction(action: unknown): void {
//         this.queue.enqueue(action);
//     }

//     public getDrainIterator(): IterableIterator<unknown> {
//         return this.queue.drain();
//     }

// }