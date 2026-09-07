import { ILoggingSystem } from "../../../algorithm_plugins/api/entities/behaviour_entities/EnvironmentSystems.js";
import { LogType, NodeLog } from "../../../algorithm_plugins/api/entities/state_entities/Logs.js";
import { LogStore } from "../../data/SimulationSnapshot.js";
import { ChangeObserverCollection } from "../../entity_observation/EntityCollectionObserver.js";

/**
 * The LogSystem is part of the SimulationEngine and 
 * implements a system of the NodeProcessEnvironment.
 *
 * From the perspective of a NodeProcess, the system behaves as a
 * local part of its environment. The actual implementation, however, is
 * part of the simulation engine and therefore has access to the engine and
 * the simulation state.
 *
 * This allows interactions performed by the NodeProcess to be translated
 * into simulation-specific actions, such as queuing messages, creating log
 * entries, or updating the presentation.
 */
export class LoggingSystem implements ILoggingSystem {

    constructor(
        private store: LogStore, // full access
        private changeObsv: ChangeObserverCollection<NodeLog>,

        private currentNode: number,
    ) { }

    public logInfo(msg: string): void {
        const log: NodeLog = new NodeLog(
            this.store.size(),
            LogType.INFO, msg,
            this.currentNode
        );

        this.store.insert(log);
        this.changeObsv.notifyCreation(log);
    }

    public logWarning(msg: string): void {
        const log: NodeLog = new NodeLog(
            this.store.size(),
            LogType.WARNING, msg,
            this.currentNode
        );

        this.store.insert(log);
        this.changeObsv.notifyCreation(log);
    }

    public logError(msg: string): void {
        const log: NodeLog = new NodeLog(
            this.store.size(),
            LogType.ERROR, msg,
            this.currentNode
        );

        this.store.insert(log);
        this.changeObsv.notifyCreation(log);
    }

}