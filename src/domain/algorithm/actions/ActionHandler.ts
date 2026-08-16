import { DoLogAction, SendMessageAction, UpdateNodePropsAction } from "./Actions.js";


//! todo or stores it??
// so no error is thrown in AlgoExec ??
// imm would make sense so that no unnötgie weiterführung wär da
// aber mb au egal wenn sim so oder so gekilled wird

export abstract class IAlgorithmActionHandler {

    /**
     * Handles Action immediatly
     * @param act 
     */
    public abstract issueDoLogAct(act: Readonly<DoLogAction>): void;

    /**
     * Handles Action immediatly
     * @param act 
     * @throws stuff is sender or receiver is invalid in any way
     */
    public abstract issueSendMessageAct(act: Readonly<SendMessageAction>): void;

    /**
     * Handles Action immediatly
     * @param act 
     * @throws error if id is invalid in any way
     */
    public abstract issueUpdateNodeAct(act: Readonly<UpdateNodePropsAction>): void;

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