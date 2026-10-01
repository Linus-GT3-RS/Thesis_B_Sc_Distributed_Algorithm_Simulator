import { IEnvSystemLogging } from "../../../algorithm_plugins/plugin_api/entities/behaviour_entities/EnvironmentSystems.js";
import { LogType, ProcessLogState } from "../../../algorithm_plugins/plugin_api/entities/state_entities/Logs.js";
import type { ProcessLogStateStore } from "../../data/SimulationSnapshot.js";
import { IChangeObserverCollection } from "../../entity_observation/EntityCollectionObserver.js";

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
export class LoggingSystem implements IEnvSystemLogging {

    constructor(
        private store: ProcessLogStateStore, // full access
        private creationObs: IChangeObserverCollection<ProcessLogState>,

        private currentNode: number,
    ) { }

    public logInfo(msg: string): void {
        const log: ProcessLogState = new ProcessLogState(
            this.store.size(),
            LogType.INFO, msg,
            this.currentNode
        );

        this.store.insert(log);
        this.creationObs.notifyChange(log);
    }

    public logWarning(msg: string): void {
        const log: ProcessLogState = new ProcessLogState(
            this.store.size(),
            LogType.WARNING, msg,
            this.currentNode
        );

        this.store.insert(log);
        this.creationObs.notifyChange(log);
    }

    public logError(msg: string): void {
        const log: ProcessLogState = new ProcessLogState(
            this.store.size(),
            LogType.ERROR, msg,
            this.currentNode
        );

        this.store.insert(log);
        this.creationObs.notifyChange(log);
    }

}