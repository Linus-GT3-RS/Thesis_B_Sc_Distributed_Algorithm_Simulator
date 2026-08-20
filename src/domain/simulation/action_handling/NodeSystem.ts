import { ISystemLocalData, MutableNodeKeys } from "../../algorithm/actions/ActionHandler.js";
import { GenericNode } from "../../algorithm/data/AlgoData.js";
import { NodeUpdateListener, SimulationUpdateListener } from "../Updates.js";



export class NodeSystem<N extends GenericNode>
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