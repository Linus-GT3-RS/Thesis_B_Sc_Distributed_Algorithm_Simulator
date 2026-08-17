import { GenericNode } from "../algorithm/data/AlgoData.js";

interface MyIdentifiable {
    id: number,
}

export class IdentifiableStoreError extends Error { }

/**
 * Handles storing and retrieving of data that 
 * satisfies the interface Identifiable
 * while only allowing the data to be of the same type.
 */
export class IdentifiableStore<T extends MyIdentifiable> {

    private map: Map<number, T> = new Map();

    /**
     * Inserts item
     * @param target 
     * @throws IdentifiableStoreError if item with given id already exists
     */
    public insert(target: T): void {
        if (this.map.has(target.id)) {
            throw new IdentifiableStoreError(
                `Item with id ${target.id} already exists in map.
                Insertion failed for target ${target}`
            );
        }
        this.map.set(target.id, target);
    }

    /**
     * Updates stored item by setting it to target
     * @param target 
     * @throws IdentifiableStoreError if no item with given id exists
     */
    public update(target: T): void {
        if (!this.map.has(target.id)) {
            throw new IdentifiableStoreError(
                `Item with id ${target.id} does not exist in map.
                Update failed for target ${target}`
            );
        }
        this.map.set(target.id, target);
    }

    /**
     * Returns item with given id
     * @param target 
     * @throws IdentifiableStoreError if item with given id does not exist
     */
    public peek(target: MyIdentifiable): T {
        const res: T | undefined = this.map.get(target.id);
        if (res === undefined) {
            throw new IdentifiableStoreError(
                `Item with id ${target.id} does not exist in map.
                Peeking failed for target ${target}`
            );
        }
        return res;
    }

}


export type GenericNodeStore = IdentifiableStore<GenericNode>
export type GenericEdgeStore = IdentifiableStore<GenericNode>