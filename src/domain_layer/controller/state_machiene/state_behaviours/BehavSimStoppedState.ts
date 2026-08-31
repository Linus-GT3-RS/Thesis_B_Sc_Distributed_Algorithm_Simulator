import { ISimulationEngine } from "../../../components/simulation/engine/SimulationEngine.js";
import { IDomainEventGateway } from "../../Controller.js";
import { IHandlerSimulateAlgoInitCmd, IHandlerSimulateForwardStepCmd, SimulateAlgoInitCmd, SimulateStepForwardCmd } from "../../gateway_data/Commands.js";

/**
 * Multiple states can support the same command,
 * but may react to it differently.
 * Reaction is handled by StateBehaviour
 * 
 * If an error occurs during processing, an
 * ErrorEvent is emitted, marking the state as unstable.
 * The user is notified via a popup and can decide
 * how to proceed.
 * 
 * The Bevahiour Class contains all commands supported by this state.
 * Developer Note:
 * The controller's whitelist determines which commands
 * are actually forwarded to the state behaviour tho.
 * 
 */
export class BehaviourSimulationStoppedState
    implements
    //* All supported Commands by this state
    IHandlerSimulateAlgoInitCmd,
    IHandlerSimulateForwardStepCmd {

    constructor(
        private simulationEngine: ISimulationEngine,
        private eventGateway: IDomainEventGateway,
    ) { }


    onSimulateAlgoInitCmd(cmd: SimulateAlgoInitCmd): void {
        try {
            this.simulationEngine.simulateInitiation(cmd.initiator);
            this.simulationEngine.simulateTimeAdvancement(0); // edge case if msgs to distance=0 were send
            // present snapshot updates
        }
        catch (error) {
            // emit error ev
        }
    }

    onSimulateStepForwardCmd(cmd: SimulateStepForwardCmd): void {
        try {
            this.simulationEngine.simulateTimeAdvancement(cmd.delta);
            // present snapshot updates
        }
        catch (error) {
            // emit error ev
        }
    }

}