import { ISystemLocalData, MutableNodeKeys } from "../../algorithm_plugin_api/actions/ActionHandler.Readme";
import { GenericNodeState } from "../../algorithm_plugin_api/entities/state_entities/AlgoData.js";
import { NodeUpdateListener, SimulationUpdateListener } from "../Updates.js";



export class NodeSystem<N extends GenericNodeState>
    implements ISystemLocalData<N> {

    constructor(
        private node: N,
        private readonly updateListener: NodeUpdateListener,
    ) { }

    /**
     * Allows to read all node properties
     * @param property 
     * @returns 
     */
    public get<K extends keyof N>(property: K): Readonly<N[K]> {
        return this.node[property];
    }

    /**
     * Allows to write mutable node properties
     * @param property 
     */
    public set<K extends MutableNodeKeys<N>>(property: K, value: N[K]): void {
        this.node[property] = value;
        this.updateListener.notifyNodeUpdated(this.node);
    }

}