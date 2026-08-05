import TinyQueue from "tinyqueue";
import { IAlgorithmActionHandler } from "../algorithm/actions/ActionHandler";
import { GenericEdge, GenericMessage, GenericNode } from "../algorithm/data/Data";
import { GenericAlgorithm } from "../algorithm/Algorithm";

export class SimulationEngine {

    //* Constructor

    public constructor(
        private algorithm: GenericAlgorithm,
        private actionHandler: IAlgorithmActionHandler,

        private nodes: Array<GenericNode>,
        private edges: Array<GenericEdge>,
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