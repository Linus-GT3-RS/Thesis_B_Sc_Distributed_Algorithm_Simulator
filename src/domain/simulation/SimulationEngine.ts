import TinyQueue from "tinyqueue";
import { IAlgorithmActionHandler } from "../algorithm/actions/ActionHandler.js"
import { GenericEdge, GenericMessage, GenericNode } from "../algorithm/data/AlgoData.js";
import { GenericAlgorithm, UnsupportedNodeTypeError } from "../algorithm/algorithm/Algorithm.js";
import { AlgorithmDataWorker, NodeNotFoundError } from "../algorithm/data/AlgoDataWorker.js";
import { Miliseconds as MilisecondsTimestamp } from "../common/Time.js";
import { DoLogAction, SendMessageAction, UpdateNodePropsAction } from "../algorithm/actions/Actions.js";

export class SimulationErrorInvalidAction extends Error { }

export class ErrorInvalidSimulationState extends Error { }
export class ErrorImpossibleInitReq extends Error { }


// todo
// simengine knows ui as eventhandler directly?
// and calls it
// state only for cmd validation and handleing

//! dequeing of cmd and actions

export class SimulationContext {
    constructor(
        public nodes: Map<number, GenericNode>,
        public edges: Map<number, GenericEdge>,
        public messages: TinyQueue<GenericMessage>,
        public curSimTimestamp: MilisecondsTimestamp,
        public algoType: AlgorithmIdentifier,
    ) { }
}



// todo rephrase
// manages
// init -> msg delivery -> algo exec -> algo action handleing
// time?
// rendering? or in state?

export class SimulationEngine
    implements IAlgorithmActionHandler {

    constructor(
        private algorithm: GenericAlgorithm,

        //! what if exc is thrown and queue not cleared?
        // decide what happens if exc is thrown... reset sim?
        // also mb catch excp here... clear cache.. and forwad them egain
        private actionManager: IAlgorithmActionManager,

        private dataWorker: AlgorithmDataWorker,
    ) { }




    //! Actions
    //? todo make into separate class
    // so its private from outside
    // and can be tested

    public issueDoLogAct(act: Readonly<DoLogAction>): void {

    }

    public issueSendMessageAct(act: Readonly<SendMessageAction>): void {

    }

    public issueUpdateNodeAct(act: Readonly<UpdateNodePropsAction>): void {

    }








    //* Messages

    //! todo remove then?
    // just make sim get context at time x and futre time y
    // and do the sim magic until future time
    // and if time is stpeped outside or rt we do not care
    // does that work with catch up?
    public processMessagesInstantTillSimTime(context: SimulationContext) {
        let next: GenericMessage | null = null;

        // iterate all pending msgs 
        while (
            (next = this.getNextPendingMsg(context)) !== null
        ) {
            const receiverNeighbors: Array<number> = this.dataWorker.getNeighborIds(
                next.receiver, context.edges.values()
            );

            // exec algo
            this.algorithm.execProtocolOnMessage(
                next.receiver, next.data, receiverNeighbors
            );
            // handle actions
            this.processIssuedAlgorithmActions(context);
        }
    }


    //todo or give engine the sim_time obj?
    /**
     * go thorugh msgs step by step time till target time
     */
    public execStepwiseUntil(snapshot: SimulationContext, targetTime: MilisecondsTimestamp): void {
        while (snapshot.curSimTimestamp < targetTime) {

            const nextPendingMsg: GenericMessage | null = this.dataWorker.dequeueNextPendingMessage(
                snapshot.messages, targetTime
            );
            if (nextPendingMsg === null) {
                snapshot.curSimTimestamp = targetTime;
                return;
            }

            // update sim time
            snapshot.curSimTimestamp = nextPendingMsg.destinationTime;

            // let algo handle msg
            const receiverNeighbors: Array<number> = this.dataWorker.getNeighborIds(
                next.receiver, context.edges.values()
            );
            this.algorithm.execProtocolOnMessage(
                next.receiver, next.data, receiverNeighbors
            );

            // process algo actions
            this.processIssuedAlgorithmActions(context);


        }



        // iterate all pending msgs  until target time
        while (
            (next = ) !== null
        ) {
            now = next.destinationTime;

            //todo
            // deliver
        }
    }

    // wrapper func
    private getNextPendingMsg(context: SimulationContext): GenericMessage | null {
        return this.dataWorker.dequeueNextPendingMessage(
            context.messages, context.curSimTimestamp
        );
    }




    //* Initiation 

    /**
     * Executes the initiation protocol for the specified node.
     * Happens immediately at the current simulation time,
     * therefore simulation time does not get advanced
     * 
     * @param initiatorId 
     * @param context 
     * @throws ErrorImpossibleInitReq if initiator id is invalid
     * @throws ErrorInvalidSimulationState if simulation state is invalid
     */
    public handleInitiation(initiatorId: number, context: SimulationContext) {
        try {
            // get data for algorithm
            const initiator: GenericNode = this.dataWorker.getNode(
                initiatorId, context.nodes
            );
            const neighbors: Array<number> = this.dataWorker.getNeighborIds(
                initiator, context.edges.values()
            );

            // exec algorithm
            this.algorithm.execProtocolOnInitiation(initiator, neighbors);

            // processed issued actions
            this.processIssuedAlgorithmActions(context); // todo?
        }
        catch (error: unknown) {
            if (error instanceof NodeNotFoundError) {
                throw new ErrorImpossibleInitReq(); //? todo msg
            }
            else if (error instanceof UnsupportedNodeTypeError) {
                throw new ErrorInvalidSimulationState(); // todo? msg
            }
            else if (/**action error */) {

            }
            else {
                throw error;
            }
        }
    }



    //* Actions

    // todo make it return callback funcs? so that this func only throws one error
    // -> or better a simple wrapper functions that does call
    // so that caller is responsible for all the other exceptions? 

    private processIssuedAlgorithmActions(context: SimulationContext): void {
        for (const act of this.actionManager.getDrainIterator()) {
            if (act instanceof DoLogAction) {
                this.processLogAction(act);
            }
            else if (act instanceof SendMessageAction) {
                this.processCreateMessageAction(act, context);
            }
            else if (act instanceof UpdateNodePropertiesAction) {
                this.processUpdateNodeAction(act);
            }
            else {
                throw new SimulationErrorInvalidAction(`Cannot handle action: ${act}`); // todo throw?
            }
        }
    }

    private processLogAction(act: DoLogAction): void {
        console.log(act); // todo ev
    }

    private processCreateMessageAction(act: SendMessageAction, context: SimulationContext): void {
        // get edge
        const edge: GenericEdge = this.dataWorker.getEdge(
            act.senderId, act.receiverId, context.edges.values()
        );

        // create GenericMsg
        const msg: GenericMessage = new GenericMessage(
            -1, // todo
            context.curSimTimestamp + edge.length_ms,
            this.dataWorker.getNodeFromEdge(act.receiverId, edge),
            act.data
        );

        // enqueue msg
        context.messages.push(msg);

        console.log(act); // todo ev
    }

    private processUpdateNodeAction(act: UpdateNodePropertiesAction): void {
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