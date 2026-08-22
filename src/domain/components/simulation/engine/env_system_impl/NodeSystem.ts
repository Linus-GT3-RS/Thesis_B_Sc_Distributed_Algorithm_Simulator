import type { ILocalDataEnvSystem, MutableNodeStateKeys } from "@/domain/components/algorithm_plugins/api/entities/behaviour_entities/EnvironmentSystems";
import type { NodeState } from "@/domain/components/algorithm_plugins/api/entities/state_entities/Nodes";
import type { NodeStateStore } from "../../SimulationSnapshot";
import type { NodeStateObserver } from "../../presenter/SimSnapshotObserver";


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
        private updateListener: NodeStateObserver,

        private currentNode: number,
    ) { }

    /**
     * Allows to read all node properties
     * @param property 
     * @returns 
     */
    public get<K extends keyof N>(property: K): Readonly<N[K]> {
        return this.store.peek(
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
        this.store.peek(
            { id: this.currentNode }
        )[property] = value;

        this.updateListener.notifyUpdate({ id: this.currentNode });
    }

}