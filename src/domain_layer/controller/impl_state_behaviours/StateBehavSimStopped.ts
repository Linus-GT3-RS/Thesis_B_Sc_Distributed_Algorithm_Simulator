import { NodeLog } from "../../components/algorithm_plugins/api/entities/state_entities/Logs.js";
import { ISimulationEngine } from "../../components/simulation/engine/SimulationEngine.js";
import { ConsumableObserverCollection as ConsumeableChangeObserverCollection } from "../../components/simulation/entity_observation/EntityCollectionObserver.js";
import { PresenterNodeLogs } from "../../components/simulation/entity_presentation/EntityStatePresenter.js";
import { CmdSimulateAlgoInit, CmdSimulateTimeAdvance } from "../../gateways/Commands.js";
import { IDomainEventGateway } from "../../gateways/EventGateway.js";
import { ErrorEv } from "../../gateways/Events.js";
import { IStateBehavSimulationStopped } from "../DomainController.js";


/**
 * A function call represents that a command is now to be handled 
 * by the current state. The controller has there already approved
 * command handleing by this state.
 * 
 * A state's behaviour decides how a command is handled. The behaviour 
 * does not however contain implementation details. Instead, it instructs 
 * his worker which actions to perform and in what order. 
 * The worker is responsible for carrying them out and therefor contains the 
 * implementation details.
*
 * Events communicate what happens during processing to the outside
 * world, such as a successful operation or an error.
 * 
 * Different states may support the same command but handle it
 * differently. Each state therefore has its own behaviour class.
 * 
 */
export class StateBehavSimulationStopped implements IStateBehavSimulationStopped {

    constructor(
        private eventGateway: IDomainEventGateway,

        //* state specific dependencies
        private simulationEngine: ISimulationEngine,

        private changeObsvNodeLogs: ConsumeableChangeObserverCollection<NodeLog>,
        // private changeObsvNodeStates: ConsumeableChangeObserverCollection<NodeState>,
        // private changeObsvMessageStates: ConsumeableChangeObserverCollection<MessageState>,
        // private changeObsvEdgeStates: ConsumeableChangeObserverCollection<BiDirectionalEdgeState>,

        private presenterNodeLogs: PresenterNodeLogs,
        // private presenterNodeStates: PresenterNodeStates,
        // private presenterMessageStates: PresenterMessageStates,
        // private presenterEdgeStates: PresenterEdgeStates,
    ) { }

    public onCmdSimulateAlgoInit(cmd: CmdSimulateAlgoInit): void {
        try {
            //= simulate init
            this.simulationEngine.simulateInitiation(cmd.initiator);
            // handle edge case in case messages with distance=0 were send
            this.simulationEngine.simulateTimeAdvancement(0);

            //= present changes of snapshot
            for (const creation of this.changeObsvNodeLogs.consumeCreationReports()) {
                this.presenterNodeLogs.presentCreation(creation);
            }
        }
        catch (error) {
            this.emitEvInvalidStateSimStopped(cmd, error);
        }
    }


    public onCmdSimulateTimeAdvance(cmd: CmdSimulateTimeAdvance): void {
        try {
            //= simulate
            this.simulationEngine.simulateTimeAdvancement(cmd.delta);

            //= present changes
            for (const creation of this.changeObsvNodeLogs.consumeCreationReports()) {
                this.presenterNodeLogs.presentCreation(creation);
            }
        }
        catch (error) {
            this.emitEvInvalidStateSimStopped(cmd, error);
        }
    }

    private emitEvInvalidStateSimStopped(cmd: unknown, error: unknown): void {
        this.eventGateway.emit(new ErrorEv(`
            An Exception occured during the handleing of a cmd in 
            the StateBehaviour for the StateSimulationStopped.
            When handleing cmd ${cmd} the following error occured: ${error}`
        ));
    }

}

