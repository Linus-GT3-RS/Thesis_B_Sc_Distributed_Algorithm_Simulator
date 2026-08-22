
//! todo full rework

import { INodeProcess } from "../../algorithm_plugins/api/entities/behaviour_entities/NodeProcess";
import type { NodeProcessEnvironment } from "../../algorithm_plugins/api/entities/behaviour_entities/NodeProcessEnv";
import { NodeLog } from "../../algorithm_plugins/api/entities/state_entities/Logs";
import { MessageState } from "../../algorithm_plugins/api/entities/state_entities/Messages";
import { NodeState } from "../../algorithm_plugins/api/entities/state_entities/Nodes";
import { EntityStateObserver } from "../presenter/SimSnapshotObserver";
import { SimulationSnapshot, type PendingMessage } from "../SimulationSnapshot";
import { SimSnapshotDataWorker } from "../worker/EntityWorker";
import { LogSystem } from "./env_system_impl/LogSystem";
import { MessageDeliverySystem } from "./env_system_impl/MsgDeliverySystem";
import { MessageSenderSystem } from "./env_system_impl/MsgSenderSystem";
import { NodeStateSystem } from "./env_system_impl/NodeSystem";


//* Errors

/**
 * If any error occurs in simulation, 
 * this exception is thrown
 * 
 * This Exceptions marks the simulation state as
 * illegal.
 * 
 * A reset should occur
 */
export class SimulationEngineError extends Error { }

//* Engine

export abstract class ISimulationEngine {

    public abstract handleInitiation(id: number): void; // todo move out? not engine task? or doesnt matter

    public abstract handlePendingMessages(): void;

}



export class SimEng<N extends NodeState> implements ISimulationEngine {

    constructor(
        private snapshot: SimulationSnapshot<N>,
        private process: INodeProcess<N>,
        private worker: SimSnapshotDataWorker,
    ) { }

    public handleInitiation(id: number): void {
        const dummy = new Set<number>();

        const env: NodeProcessEnvironment<N> = {
            up: new LogSystem(
                this.snapshot.logs,
                new EntityStateObserver<NodeLog>(dummy),
                id
            ),
            local: new NodeStateSystem<N>(
                this.snapshot.nodeStates,
                new EntityStateObserver<NodeState>(dummy),
                id
            ),
            in: new MessageDeliverySystem(
                null
            ),
            out: new MessageSenderSystem(
                this.snapshot.msgStates,
                this.snapshot.pendingMessages,
                this.snapshot.simulationTimestamp,
                new EntityStateObserver<MessageState>(dummy),
                this.snapshot.edgeStates,
                this.worker,
                id
            ),
        };

        this.process.onInitiationInstruction(env);
    }

    public handlePendingMessages(): void {
        let nextPending: PendingMessage | null =
            this.worker.dequeueNextPendingMessage(
                this.snapshot.pendingMessages,
                this.snapshot.simulationTimestamp,
            );

        while (nextPending !== null) { // pending messages exist
            // deliver
            const msg: MessageState = this.snapshot.msgStates.read(
                nextPending
            );
            const dummy = new Set<number>();

            const env: NodeProcessEnvironment<N> = {
                up: new LogSystem(
                    this.snapshot.logs,
                    new EntityStateObserver<NodeLog>(dummy),
                    msg.receiverNode.id
                ),
                local: new NodeStateSystem<N>(
                    this.snapshot.nodeStates,
                    new EntityStateObserver<NodeState>(dummy),
                    msg.receiverNode.id
                ),
                in: new MessageDeliverySystem(
                    msg.data
                ),
                out: new MessageSenderSystem(
                    this.snapshot.msgStates,
                    this.snapshot.pendingMessages,
                    msg.destinationTime,
                    new EntityStateObserver<MessageState>(dummy),
                    this.snapshot.edgeStates,
                    this.worker,
                    msg.receiverNode.id
                ),
            };

            this.process.onIncomingMessage(env);

            nextPending = this.worker.dequeueNextPendingMessage(
                this.snapshot.pendingMessages,
                this.snapshot.simulationTimestamp,
            );
        }
    }

}



// //! todo 
// // catch exceptions noted in ipad dennis


// export class SimulationEngine
//     implements IAlgorithmActionScheduler {


//     //* Messages

//     //! todo remove then?
//     // just make sim get context at time x and futre time y
//     // and do the sim magic until future time
//     // and if time is stpeped outside or rt we do not care
//     // does that work with catch up?
//     public processMessagesInstantTillSimTime(context: SimulationContext) {
//         let next: GenericMessage | null = null;

//         // iterate all pending msgs 
//         while (
//             (next = this.getNextPendingMsg(context)) !== null
//         ) {
//             const receiverNeighbors: Array<number> = this.dataWorker.getNeighborIds(
//                 next.receiverNode, context.edges.values()
//             );

//             // exec algo
//             this.algorithm.issueIncomingMessage(
//                 next.receiverNode, next.data, receiverNeighbors
//             );
//             // handle actions
//             this.processIssuedAlgorithmActions(context);
//         }
//     }


//     //todo or give engine the sim_time obj?
//     /**
//      * go thorugh msgs step by step time till target time
//      */
//     public execStepwiseUntil(snapshot: SimulationContext, targetTime: MilisecondsTimestamp): void {
//         while (snapshot.curSimTimestamp < targetTime) {

//             const nextPendingMsg: GenericMessage | null = this.dataWorker.dequeueNextPendingMessage(
//                 snapshot.pendingMessages, targetTime
//             );
//             if (nextPendingMsg === null) {
//                 snapshot.curSimTimestamp = targetTime;
//                 return;
//             }

//             // update sim time
//             snapshot.curSimTimestamp = nextPendingMsg.destinationTime;

//             // let algo handle msg
//             const receiverNeighbors: Array<number> = this.dataWorker.getNeighborIds(
//                 next.receiver, context.edges.values()
//             );
//             this.algorithm.issueIncomingMessage(
//                 next.receiver, next.data, receiverNeighbors
//             );

//             // process algo actions
//             this.processIssuedAlgorithmActions(context);


//         }



//         // iterate all pending msgs  until target time
//         while (
//             (next = ) !== null
//         ) {
//             now = next.destinationTime;

//             //todo
//             // deliver
//         }
//     }

//     // wrapper func
//     private getNextPendingMsg(context: SimulationContext): GenericMessage | null {
//         return this.dataWorker.dequeueNextPendingMessage(
//             context.pendingMessages, context.curSimTimestamp
//         );
//     }




//     //* Initiation 

//     /**
//      * Executes the initiation protocol for the specified node.
//      * Happens immediately at the current simulation time,
//      * therefore simulation time does not get advanced
//      */
//     public handleInitiation(initiatorId: number, context: SimulationContext);
// }






// // export class IthinkThisIsState {


// //     //* Command Handling

// //     // todo make it return callback funcs? so that this func only throws one error
// //     // -> or better a simple wrapper functions that does call
// //     /**
// //      * 
// //      * @param cmd 
// //      * @throws UnsupportedSimulationCommandError
// //      */
// //     private processCommand(cmd: unknown): void {
// //         if (cmd instanceof InitiationRequestSimulationCmd) {
// //             this.onInitiationRequestCmd(cmd);
// //         }
// //         else {
// //             throw new UnsupportedSimulationCommandError(
// //                 `Cannot process command: ${cmd}`
// //             );
// //         }
// //     }

// //     // InitiationRequest Cmd
// //     private onInitiationRequestCmd(cmd: InitiationRequestSimulationCmd): void {
// //         catch (error: unknown) {
// //             if (error instanceof NodeNotFoundError) {
// //                 // todo ev
// //             }
// //             else if (error instanceof UnsupportedNodeTypeError) {
// //                 // todo ev
// //             }
// //         }
// //     }


// //     // Stop Cmd
// //     //? todo emit context?
// //     private onStopCmd(): void {
// //         throw new Error();
// //     }

// //     //? todo run? or start and continue?
// //     private onRunCmd(): void {
// //         throw new Error();
// //     }

// //     // private onResumeCmd(): void {
// //     //     // const diff_ms: number = this.now - this.lastStopTime;

// //     //     // for (const msg of this.messageQueue) {
// //     //     //     msg.destinationTime += diff_ms;

// //     //     //     // todo updt queue??
// //     //     // }
// //     // }