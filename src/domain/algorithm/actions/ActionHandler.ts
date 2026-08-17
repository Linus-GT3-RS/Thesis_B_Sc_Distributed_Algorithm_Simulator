import { DoLogAction, SendMessageAction, UpdateNodePropsAction } from "./Actions.js";

export type AlgorithmAction =
    DoLogAction
    | SendMessageAction
    | UpdateNodePropsAction

export abstract class IAlgorithmActionScheduler {

    /**
     * Enqueues given action
     * @param act 
     */
    public abstract scheduleAction(act: AlgorithmAction): void;

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