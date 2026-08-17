import { IAlgorithmActionHandler, AlgorithmAction } from "../algorithm/actions/ActionHandler.js";
import { DoLogAction, SendMessageAction, UpdateNodeAction } from "../algorithm/actions/Actions.js";
import { GenericEdge, GenericMessage } from "../algorithm/data/AlgoData.js";
import { AlgorithmDataWorker } from "../algorithm/data/AlgoDataWorker.js";
import { Identifiable } from "../common/EntityStores.js";
import { SimulationContext, InvalidSimulationStateError } from "./SimulationEngine.js";

// todo
// simengine knows ui as eventhandler directly?
// and calls it
// state only for cmd validation and handleing

export abstract class Listener {

    public abstract emit(): void;

}

/**
 * Processes actions issued by the algorithm
 * and updates simulation context as a result
 */
export class AlgorithmActionHandler
    implements IAlgorithmActionHandler {

    constructor(
        private context: SimulationContext,
        private dataWorker: AlgorithmDataWorker,


        private listener: Listener, // todo
    ) { }

    /**
     * Handles action
     * @param act 
     * @throws InvalidSimulationStateError if action is unknown
     */
    public handle(act: AlgorithmAction, issuerNode: Identifiable): void {
        if (act instanceof DoLogAction) {
            this.handleDoLogAction(act);
        }
        else if (act instanceof SendMessageAction) {
            this.handleSendMessageAction(act, issuerNode);
        }
        else if (act instanceof UpdateNodeAction) {
            this.handleUpdateNodePropsAction(act, issuerNode);
        }
        else {
            throw new InvalidSimulationStateError(
                `Cannot handle action of type ${act}`
            );
        }
    }


    //! todo how to send events 
    // and which


    private handleDoLogAction(act: DoLogAction): void {
    }

    private handleSendMessageAction(act: SendMessageAction, issuerNode: Identifiable): void {
        try {
            // sanity check if edge exists 
            const edge: GenericEdge = this.dataWorker.findEdge(
                issuerNode.id, act.receiverId, this.context.edges.peekAllValues()
            );

            // enqueue msg
            this.context.messages.push(new GenericMessage(
                -1, // todo
                this.context.curSimTimestamp + edge.length_ms,
                this.context.nodes.peek({ id: act.receiverId }),
                act.data
            ));
        }
        catch (error) {
            throw new InvalidSimulationStateError(
                `Invalid Action. ${error}`
            );
        }
    }

    private handleUpdateNodePropsAction(act: UpdateNodeAction, issuerNode: Identifiable): void {
        // sanity check 
        if (issuerNode.id !== act.updatedNode.id) {
            throw new InvalidSimulationStateError(
                `The issuerNode with id ${issuerNode.id} cannot update the Node
                with id ${act.updatedNode.id}`
            );
        }

        try {
            this.context.nodes.update(act.updatedNode);
        }
        catch (error) {
            throw new InvalidSimulationStateError(`${error}`);
        }
    }
}