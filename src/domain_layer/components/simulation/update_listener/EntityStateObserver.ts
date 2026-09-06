import { Identifiable } from "../../../../common/EntityStores.js";

//* Types
export type EntityUpdateListener<I extends Identifiable> =
    Pick<IEntityStateObserver<I>, "notifyUpdate">



//* Observer

/**
 * Observes updates to entities of a given type E
 * and records the IDs of updated ones.
 */
export abstract class IEntityStateObserver<E extends Identifiable> {

    /**
     * When an update is reported, the corresponding entity ID
     * is stored and can later be retrieved by the consumer.

     * @param entityId 
     */
    public abstract notifyUpdate(entity: E): void;

    /**
     * Gets all currently recorded updates.
     * 
     * This is a consuming call: after invocation, the 
     * observer contains no recorded updates until the next update occurs.
    */
    public abstract consumeUpdates(): Iterable<number>;

}

/**
 * For performance reasons only the most latest update
 * is stored.
 */
export class SmartEntityStateObserver<E extends Identifiable>
    implements IEntityStateObserver<E> {

    constructor(
        private updates: Set<number>,
    ) { }

    public notifyUpdate(entity: E): void {
        this.updates.add(entity.id);
    }

    public consumeUpdates(): Iterable<number> {
        const it: Iterable<number> = this.updates.values();
        this.updates = new Set<number>();
        return it;
    }

}