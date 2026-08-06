import TinyQueue from "tinyqueue";
import { IAlgorithmActionHandler } from "../algorithm/actions/ActionHandler.js";
import { GenericEdge, GenericMessage, GenericNode } from "../algorithm/data/Data.js";
import { GenericAlgorithm } from "../algorithm/algorithm/Algorithm.js";
import { AlgorithmDataWorker } from "../algorithm/data/AlgoDataWorker.js";
import { LogAction } from "../algorithm/actions/Actions.js";

export class SimulationEngine {

    //* Constructor

    public constructor(
        private algorithm: GenericAlgorithm,
        private actionHandler: IAlgorithmActionHandler,

        private nodes: Map<number, GenericNode>,
        private edges: Map<number, GenericEdge>,
        private messages: TinyQueue<GenericMessage>,


        // todo time
        // private now: MilisecsSinceEpoch = -1,
        // private readonly lastStopTime: MilisecsSinceEpoch,
    ) {
        // init MessageQueue
        if (this.messages.length <= 0) {
            this.messages = new TinyQueue(messages.data,
                // Queue is sorted ascending by delivery time.
                // The first message is always the next to be delivered.
                (a, b) => {
                    return a.destinationTime - b.destinationTime;
                }
            );
        }
    }


    //* Action Handling

    // public handleAction(action: unknown): void {
    //     // todo
    //     // enqueue action?
    //     // or
    //     // directly handle it
    //     throw new Error();
    // }

    private handleCreateMessageAction(): void {

    }

    private handleUpdateNodeAction(): void {

    }

    private handleLogAction(act: Readonly<LogAction>): void {

    }


    //* Command Handling

    // private handleCommand(): void {

    // }

    // private onResumeCmd(): void {
    //     // const diff_ms: number = this.now - this.lastStopTime;

    //     // for (const msg of this.messageQueue) {
    //     //     msg.destinationTime += diff_ms;

    //     //     // todo updt queue??
    //     // }
    // }

    //* InitiationRequest Cmd
    private onInitiationRequestCmd(nodeID: number): void {
        // check if node exists
        const node: GenericNode | undefined = this.nodes.get(nodeID);
        if (node === undefined) {
            // todo 
            // emit ErrorEv
            return;
        }

        // get node neighbors
        const worker: AlgorithmDataWorker = new AlgorithmDataWorker();
        const neighbors: Array<number> = worker.getNeighborIDs(
            node, this.edges.values()
        );

        this.algorithm.onInitiationRequest(node, neighbors);

        // todo emit ev?
    }


    //* Stop Cmd
    private onStopCmd(): void {
        // todo emit context?
    }

    // todo run? or start and continue?
    private onRunCmd(): void {

    }


    //* Engine Loop

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