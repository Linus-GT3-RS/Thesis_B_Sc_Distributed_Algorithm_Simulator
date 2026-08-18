import { GenericNode } from "../../algorithm/data/AlgoData.js";

type MutableNodeKeys<N extends GenericNode> =
    Exclude<keyof N, keyof GenericNode> // is union

export class NodeSystem<N extends GenericNode> {

    constructor(
        private node: N,
    ) { }

    /**
     * Allows to read all node properties
     * @param property 
     * @returns 
     */
    get<K extends keyof N>(property: K): Readonly<N[K]> {
        return this.node[property];
    }

    /**
     * Allows to write mutable node properties
     * @param property 
     */
    set<K extends MutableNodeKeys<N>>(property: K, value: N[K]) {
        this.node[property] = value;
    }

}