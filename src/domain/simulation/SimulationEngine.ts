import TinyQueue from "tinyqueue";
import { IAlgorithmActionHandler } from "../algorithm/actions/ActionHandler.js";
import { GenericEdge, GenericMessage, GenericNode } from "../algorithm/data/AlgoData.js";
import { GenericAlgorithm, UnsupportedNodeTypeError } from "../algorithm/algorithm/Algorithm.js";
import { AlgorithmDataWorker, NodeNotFoundError } from "../algorithm/data/AlgoDataWorker.js";
import { CreateMessageAction, LogAction } from "../algorithm/actions/Actions.js";
import { InitiationRequestSimulationCmd } from "./Simulation_Commands.js";

export class UnsupportedActionError extends Error { }
export class UnsupportedSimulationCommandError extends Error { }


//! enqueing of cmd and actions
//! dequeing of cmd and actions

//? time

export class SimulationEngine {

    //* Constructor

    public constructor(
        private algorithm: GenericAlgorithm,
        private actionHandler: IAlgorithmActionHandler,

        private nodes: Map<number, GenericNode>,
        private edges: Map<number, GenericEdge>,
        private messages: TinyQueue<GenericMessage>,

        private worker: AlgorithmDataWorker,
        // todo time
        // private now: MilisecsSinceEpoch = -1,
        // private readonly lastStopTime: MilisecsSinceEpoch,
    ) {
        //? init MessageQueue:
        // Queue is sorted ascending by delivery time.
        // The first message is always the next to be delivered.
        if (this.messages.length <= 0) {
            this.messages = new TinyQueue(messages.data,
                (a, b) => {
                    return a.destinationTime - b.destinationTime;
                }
            );
        }
    }


    //* Action Processing

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
        try {
            const initiator: GenericNode = this.worker.getNode(
                cmd.initiatorId, this.nodes
            );
            const neighbors: Array<number> = this.worker.getNeighborIDs(
                initiator, this.edges.values()
            );

            this.algorithm.onInitiationRequest(initiator, neighbors);
            // todo emit ev?
        }
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

    //! todo catch errors in loop?
    // and handle them there?
    // -> no code dupl

    // private engineLoop(): void {
    //     // this.now = Date.now();
    // }

    // private processMessageQueue(): void {
    //     // // check if messages have to be delivered
    //     // while (this.msgQueue.peek().destinationTime <= this.now) {
    //     //     // Deliver Message
    //     //     const msg: AlgorithmMessage<MsgData> = this.msgQueue.pop();

    //     //     // todo error check
    //     //     const receiver = this.nodes.get(msg.receiver);

    //     //     // todo determine neighbors of receiver 
    //     //     const neighbors = new Array<InternalID>();

    //     //     this.algorithm.onMessageDelivery(
    //     //         receiver,
    //     //         msg.data,
    //     //         neighbors
    //     //     );

    //     //     // Process generated Actions
    //     //     // todo
    // }


}