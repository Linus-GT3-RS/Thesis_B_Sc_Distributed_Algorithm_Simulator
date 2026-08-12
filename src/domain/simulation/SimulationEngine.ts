import TinyQueue from "tinyqueue";
import { IAlgorithmActionManager } from "../algorithm/actions/ActionHandler.js";
import { GenericEdge, GenericMessage, GenericNode } from "../algorithm/data/AlgoData.js";
import { GenericAlgorithm } from "../algorithm/algorithm/Algorithm.js";
import { AlgorithmDataWorker } from "../algorithm/data/AlgoDataWorker.js";
import { CreateMessageAction, LogAction, UpdateNodeAction } from "../algorithm/actions/Actions.js";
import { Miliseconds as MilisecondsTimestamp } from "../common/Time.js";

export class SimulationErrorInvalidAction extends Error { }




// todo
// simengine knows ui as eventhandler directly?
// and calls it
// state only for cmd validation and handleing

//! dequeing of cmd and actions

export class SimulationContext {
    constructor(
        public algorithm: AlgorithmIdentifier,
        public nodes: Map<number, GenericNode>,
        public edges: Map<number, GenericEdge>,
        public messages: TinyQueue<GenericMessage>,
        public curSimulationTimestamp: MilisecondsTimestamp,
    ) { }
}


export class SimulationEngine {

    constructor(
        private algorithm: GenericAlgorithm,

        //! what if exc is thrown and queue not cleared?
        // decide what happens if exc is thrown... reset sim?
        // also mb catch excp here... clear cache.. and forwad them egain
        private actionManager: IAlgorithmActionManager,

        private dataWorker: AlgorithmDataWorker,
    ) { }

    //* Messages

    public processMessagesAtCurrentSimulationTime(context: SimulationContext) {
        let next: GenericMessage | null = null;

        // iterate all pending msgs 
        while (
            (next = this.getNextPendingMsg(context)) !== null
        ) {
            const receiverNeighbors: Array<number> = this.dataWorker.getNeighborIds(
                next.receiver, context.edges.values()
            );

            // exec algo
            this.algorithm.onMessageDelivery(
                next.receiver, next.data, receiverNeighbors
            );
            // handle actions
            this.processIssuedAlgorithmActions(context);
        }
    }

    // wrapper func
    private getNextPendingMsg(context: SimulationContext): GenericMessage | null {
        return this.dataWorker.dequeueNextPendingMessage(
            context.messages, context.curSimulationTimestamp
        );
    }

    //* Initiation 

    public handleInitiationRequest(initiatorId: number, context: SimulationContext) {
        const initiator: GenericNode = this.dataWorker.getNode(
            initiatorId, context.nodes
        );
        const neighbors: Array<number> = this.dataWorker.getNeighborIds(
            initiator, context.edges.values()
        );

        // exec algorithm
        this.algorithm.onInitiationRequest(initiator, neighbors);
        // handle actions
        this.processIssuedAlgorithmActions(context);
    }

    //* Actions

    // todo make it return callback funcs? so that this func only throws one error
    // -> or better a simple wrapper functions that does call
    // so that caller is responsible for all the other exceptions? 

    private processIssuedAlgorithmActions(context: SimulationContext): void {
        for (const act of this.actionManager.getDrainIterator()) {
            if (act instanceof LogAction) {
                this.processLogAction(act);
            }
            else if (act instanceof CreateMessageAction) {
                this.processCreateMessageAction(act, context);
            }
            else if (act instanceof UpdateNodeAction) {
                this.processUpdateNodeAction(act);
            }
            else {
                throw new SimulationErrorInvalidAction(`Cannot handle action: ${act}`); // todo throw?
            }
        }
    }

    private processLogAction(act: LogAction): void {
        console.log(act); // todo ev
    }

    private processCreateMessageAction(act: CreateMessageAction, context: SimulationContext): void {
        // get edge
        const edge: GenericEdge = this.dataWorker.getEdge(
            act.senderId, act.receiverId, context.edges.values()
        );

        // create GenericMsg
        const msg: GenericMessage = new GenericMessage(
            -1, // todo
            context.curSimulationTimestamp + edge.length_ms,
            this.dataWorker.getNodeFromEdge(act.receiverId, edge),
            act.data
        );

        // enqueue msg
        context.messages.push(msg);

        console.log(act); // todo ev
    }

    private processUpdateNodeAction(act: UpdateNodeAction): void {
        console.log(act); // todo ev
    }

}






// export class IthinkThisIsState {


//     //* Command Handling

//     // todo make it return callback funcs? so that this func only throws one error
//     // -> or better a simple wrapper functions that does call
//     /**
//      * 
//      * @param cmd 
//      * @throws UnsupportedSimulationCommandError
//      */
//     private processCommand(cmd: unknown): void {
//         if (cmd instanceof InitiationRequestSimulationCmd) {
//             this.onInitiationRequestCmd(cmd);
//         }
//         else {
//             throw new UnsupportedSimulationCommandError(
//                 `Cannot process command: ${cmd}`
//             );
//         }
//     }

//     // InitiationRequest Cmd
//     private onInitiationRequestCmd(cmd: InitiationRequestSimulationCmd): void {
//         catch (error: unknown) {
//             if (error instanceof NodeNotFoundError) {
//                 // todo ev
//             }
//             else if (error instanceof UnsupportedNodeTypeError) {
//                 // todo ev
//             }
//         }
//     }


//     // Stop Cmd
//     //? todo emit context?
//     private onStopCmd(): void {
//         throw new Error();
//     }

//     //? todo run? or start and continue?
//     private onRunCmd(): void {
//         throw new Error();
//     }

//     // private onResumeCmd(): void {
//     //     // const diff_ms: number = this.now - this.lastStopTime;

//     //     // for (const msg of this.messageQueue) {
//     //     //     msg.destinationTime += diff_ms;

//     //     //     // todo updt queue??
//     //     // }
//     // }