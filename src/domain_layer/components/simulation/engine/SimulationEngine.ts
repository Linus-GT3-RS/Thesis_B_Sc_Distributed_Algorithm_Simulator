import TinyQueue from "tinyqueue";
import { IAlgorithmActionScheduler } from "./algorithm_plugin_api/actions/ActionScheduler.js"
import { GenericMessage, GenericNodeState } from "./algorithm_plugin_api/entities/state_entities/AlgoData.js";
import { GenericNodeProcess, UnsupportedNodeTypeError } from "./algorithm_plugin_api/algorithm/AlgorithmProtocol.js";
import { AlgorithmDataWorker, NodeNotFoundError } from "./algorithm_plugin_api/entities/state_entities/AlgoDataWorker.js";
import { Miliseconds as MilisecondsTimestamp } from "../common/Time.js";
import { GenericEdgeStore, GenericNodeStore, Identifiable, IdentifiableError, IdentifiableStore, RoStore as ReadonlyStore } from "../common/EntityStores.js";

export class SimulationSnapshot {
    constructor(
        public curSimTimestamp: MilisecondsTimestamp,

        public nodes: GenericNodeStore,
        public edges: GenericEdgeStore,

        //! todo i need to store all
        // but that could give inconsistencies?
        public pendingMessages: TinyQueue<PendingMessage>,
        public allMessages: IdentifiableStore<GenericMessage>,

        public logs: IdentifiableStore<NodeLog>,


        public algoType: AlgorithmIdentifier,
    ) { }
}



//! this is what state knows
export abstract class ISimulationEngine {

    public abstract handleInitiation(): void;

    public abstract handlePendingMessages(): void;

}


export class SimulationEngine
    implements IAlgorithmActionScheduler {

    constructor(
        private nodeProcessImitator: GenericNodeProcess,

        private dataWorker: AlgorithmDataWorker,
    ) { }

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
                next.receiverNode, context.edges.values()
            );

            // exec algo
            this.algorithm.issueIncomingMessage(
                next.receiverNode, next.data, receiverNeighbors
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
                snapshot.pendingMessages, targetTime
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
            this.algorithm.issueIncomingMessage(
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
            context.pendingMessages, context.curSimTimestamp
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
            const initiator: GenericNodeState = this.dataWorker.getNode(
                initiatorId, context.nodes
            );
            const neighbors: Array<number> = this.dataWorker.getNeighborIds(
                initiator, context.edges.values()
            );

            // exec algorithm
            this.algorithm.issueInitiation(initiator, neighbors);

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