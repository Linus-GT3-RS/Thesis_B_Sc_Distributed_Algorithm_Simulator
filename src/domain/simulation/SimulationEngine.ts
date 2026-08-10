import TinyQueue from "tinyqueue";
import { IAlgorithmActionHandler, IAlgorithmActionManager } from "../algorithm/actions/ActionHandler.js";
import { GenericEdge, GenericMessage, GenericNode } from "../algorithm/data/AlgoData.js";
import { GenericAlgorithm, UnsupportedNodeTypeError } from "../algorithm/algorithm/Algorithm.js";
import { AlgorithmDataWorker, NodeNotFoundError } from "../algorithm/data/AlgoDataWorker.js";
import { CreateMessageAction, LogAction } from "../algorithm/actions/Actions.js";
import { InitiationRequestSimulationCmd } from "./Simulation_Commands.js";
import { Miliseconds as MilisecondsTimestamp, MilisecsSinceEpoch } from "../common/Time.js";

export class UnsupportedActionError extends Error { }


// todo move to state
export class UnsupportedSimulationCommandError extends Error { }

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
        public simTime: MilisecondsTimestamp,
    ) { }
}

export class SimulationEngine {

    constructor(
        private algorithm: GenericAlgorithm,
        private actionManager: IAlgorithmActionManager,
        private dataWorker: AlgorithmDataWorker,
    ) { }

    //* Messages

    public processMessagesAt(context: SimulationContext) {
        let next: GenericMessage | null = null;

        // iterate all pending msgs 
        while (
            (next = this.getNextPendingMsg(context)) !== null
        ) {
            // deliver
            const receiverNeighbors: Array<number> = this.dataWorker.getNeighborIds(
                next.receiver, context.edges.values()
            );
            this.algorithm.onMessageDelivery(
                next.receiver, next.data, receiverNeighbors
            );

            // handle actions
            this.processAllActions();
        }
    }

    // wrapper func
    private getNextPendingMsg(context: SimulationContext): GenericMessage | null {
        return this.dataWorker.dequeueNextPendingMessage(
            context.messages, context.simTime
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

        this.algorithm.onInitiationRequest(initiator, neighbors);
        this.processAllActions();
    }

    //* Actions

    private processAllActions(): void {
        // TODO
    }


    // todo make it return callback funcs? so that this func only throws one error
    // -> or better a simple wrapper functions that does call
    // so that caller is responsible for all the other exceptions? 
    /**
     * 
     * @param action 
     * @throws UnsupportedActionError 
     */
    private handleAction(action: unknown): void {
        if (action instanceof LogAction) {
            this.processLogAction(action);
        }
        else if (action instanceof CreateMessageAction) {
            this.processCreateMessageAction(action);
        }
        else {
            throw new UnsupportedActionError(`Cannot handle action: ${action}`);
        }
    }

    private processLogAction(act: LogAction): void {
        console.log(act.logMsg); // todo ev
    }

    private processCreateMessageAction(act: CreateMessageAction): void {
        // get edge
        const edge: GenericEdge = this.worker.getEdge(
            act.senderId, act.receiverId, this.edges.values()
        );

        // create GenericMsg
        const msg: GenericMessage = new GenericMessage(
            -1, // todo
            0, // todo
            this.worker.getNodeFromEdge(act.receiverId, edge),
            act.data
        );

        // enqueue msg
        this.messages.push(msg);
        console.log("Created GenericMsg"); // todo ev
    }

    private processUpdateNodeAction(): void {

    }


}


//? time

export class IthinkThisIsState {

    public constructor(
        // private readonly lastStopTime: MilisecsSinceEpoch,
    ) { }


    //* Command Handling

    // todo make it return callback funcs? so that this func only throws one error
    // -> or better a simple wrapper functions that does call
    /**
     * 
     * @param cmd 
     * @throws UnsupportedSimulationCommandError
     */
    private processCommand(cmd: unknown): void {
        if (cmd instanceof InitiationRequestSimulationCmd) {
            this.onInitiationRequestCmd(cmd);
        }
        else {
            throw new UnsupportedSimulationCommandError(
                `Cannot process command: ${cmd}`
            );
        }
    }

    // InitiationRequest Cmd
    private onInitiationRequestCmd(cmd: InitiationRequestSimulationCmd): void {
        catch (error: unknown) {
            if (error instanceof NodeNotFoundError) {
                // todo ev
            }
            else if (error instanceof UnsupportedNodeTypeError) {
                // todo ev
            }
        }
    }


    // Stop Cmd
    //? todo emit context?
    private onStopCmd(): void {
        throw new Error();
    }

    //? todo run? or start and continue?
    private onRunCmd(): void {
        throw new Error();
    }

// private onResumeCmd(): void {
//     // const diff_ms: number = this.now - this.lastStopTime;

//     // for (const msg of this.messageQueue) {
//     //     msg.destinationTime += diff_ms;

//     //     // todo updt queue??
//     // }
// }


//* Engine Loop

// private engineLoop(): void {
//     // this.now = Date.now();
// }
