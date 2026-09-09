import type { CmdSimulateAlgoInit, CmdSimulateTimeAdvance } from "@/domain_layer/gateways/Commands.js";
import { ErrorEv } from "@/domain_layer/gateways/Events.js";
import { ISimulationEngine } from "../../components/simulation/engine/SimulationEngine.js";
import { IPresentationCoordinator } from "../../components/simulation/entity_presentation/PresentationCoordinator.js";
import { IDomainEventGateway } from "../../gateways/EventGateway.js";
import type { IStateBehavSimulationStopped } from "../DomainController.js";


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

        //* state specific workers
        private simulationEngine: ISimulationEngine,
        private changePresenter: IPresentationCoordinator,
    ) { }

    public onCmdSimulateAlgoInit(cmd: CmdSimulateAlgoInit): void {
        try {
            //= simulate init
            this.simulationEngine.simulateInitiation(cmd.initiator);
            // handle edge case in case messages with distance=0 were send
            this.simulationEngine.simulateTimeAdvancement(0);

            //= present changes of snapshot
            this.changePresenter.presentSnapshotChanges();
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
            this.changePresenter.presentSnapshotChanges();
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

