import { GenericEdge, GenericNode } from "../algorithm/data/AlgoData.js";

export class IdentifiableError extends Error { }

export interface Identifiable {
    id: number,
}

/**
 * Handles storing and retrieving of data that 
 * satisfies the interface Identifiable
 * while only allowing the data to be of the same type.
 */
export class IdentifiableStore<T extends Identifiable> {

    private map: Map<number, T> = new Map();

    /**
     * Inserts item
     * @param target 
     * @throws {IdentifiableError} if item with given id already exists
     */
    public insert(target: T): void {
        if (this.map.has(target.id)) {
            throw new IdentifiableError(
                `Item with id ${target.id} already exists in map.
                Insertion failed for target ${target}`
            );
        }
        this.map.set(target.id, target);
    }

    /**
     * Updates stored item by setting it to target
     * @param target 
     * @throws {IdentifiableError} if no item with given id exists
     */
    public update(target: T): void {
        if (!this.map.has(target.id)) {
            throw new IdentifiableError(
                `Item with id ${target.id} does not exist in map.
                Update failed for target ${target}`
            );
        }
        this.map.set(target.id, target);
    }

    /**
     * Returns item with given id.
     * This allows full access to the item.
     * @param target 
     * @throws {IdentifiableError} if item with given id does not exist
     */
    public peek(target: Identifiable): T {
        const res: T | undefined = this.map.get(target.id);
        if (res === undefined) {
            throw new IdentifiableError(
                `Item with id ${target.id} does not exist in map.
                Peeking failed for target ${target}`
            );
        }
        return res;
    }


    public peekAllValues(): MapIterator<Readonly<T>> {
        return this.map.values();
    }

    public size(): number {
        return this.map.size;
    }

}


export type GenericNodeStore = IdentifiableStore<GenericNode>;
export type GenericEdgeStore = IdentifiableStore<GenericEdge>;

export type ReadonlyStore<I extends Identifiable> = Pick<IdentifiableStore<Readonly<I>>, "peek" | "peekAllValues" | "size">  
