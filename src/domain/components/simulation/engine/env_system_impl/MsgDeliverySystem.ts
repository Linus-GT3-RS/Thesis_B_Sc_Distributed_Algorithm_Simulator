import { ISystemIncomingMessages, MessageSystemError } from "../../../algorithm_plugins/api/entities/behaviour_entities/EnvironmentSystems.js";
import { MessageData } from "../../../algorithm_plugins/api/entities/state_entities/Messages.js";

//* System

//? todo make msg only deliverd
// if it got actively retrieved by node process?

/**
 * The {@link MessageDeliverySystem} is part of the SimulationEngine and 
 * implements a system of the {@link NodeProcessEnvironment}.
 *
 * From the perspective of a NodeProcess, the system behaves as a
 * local part of its environment. The actual implementation, however, is
 * part of the {@link SimulationEngine} and therefore has access to 
 * the current state of the simulation via the {@link SimulationSnapshot}.
 *
 * This allows interactions performed by the NodeProcess to be translated
 * into simulation-specific actions, such as queuing messages, creating log
 * entries, or updating the presentation.
 */
export class MessageDeliverySystem
    implements ISystemIncomingMessages {

    constructor(
        private pendingMessage: Readonly<MessageData> | null,
    ) { }


    public readPendingMessage(): Readonly<MessageData> {
        if (this.pendingMessage === null) {
            throw new MessageSystemError('No Pending Message');
        }
        return this.pendingMessage;
    }



}