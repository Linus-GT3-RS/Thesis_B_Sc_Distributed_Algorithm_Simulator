import type { ILocalDataEnvSystem, MutableNodeStateKeys } from "@/domain_layer/components/algorithm_plugins/plugin_api/entities/behaviour_entities/EnvironmentSystems.js";
import type { NodeState } from "../../../algorithm_plugins/plugin_api/entities/state_entities/Nodes.js";
import type { NodeStateStore } from "../../data/SimulationSnapshot.js";
import { IChangeObserverCollection } from "../../entity_observation/EntityCollectionObserver.js";


/**
 * The {@link NodeSystem} is part of the SimulationEngine and 
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
export class NodeStateSystem<N extends NodeState>
    implements ILocalDataEnvSystem<N> {

    constructor(
        private store: NodeStateStore<N>, // full access
        private changeObsv: IChangeObserverCollection<NodeState>,

        private currentNode: number,
    ) { }

    /**
     * Allows to read all node properties
     * @param property 
     * @returns 
     */
    public get<K extends keyof N>(property: K): Readonly<N[K]> {
        return this.store.interact(
            { id: this.currentNode }
        )[property];
    }

    /**
     * Allows to write mutable node properties
     * @param property 
     */
    public set<K extends MutableNodeStateKeys<N>>(
        property: K,
        value: N[K]
    ): void {
        this.store.interact(
            { id: this.currentNode }
        )[property] = value;

        this.changeObsv.notifyChange({ id: this.currentNode });
    }

}