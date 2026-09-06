import { Identifiable } from "../../../../common/EntityStores.js";

//* Types

export type ChangeObserverCollection<I extends Identifiable> =
    Pick<IObserverEntityCollection<I>, "notifyUpdate" | "notifyCreation">

export type ConsumableObserverCollection<I extends Identifiable> =
    Pick<IObserverEntityCollection<I>,
        "consumeCreationReports" | "consumeUpdateReports">


//* Observer

/**
 * Observes CRUD actions to entities with a given type
 * and records the action type with the id of the entity
 */
export abstract class IObserverEntityCollection<TypeEntity extends Identifiable> {


    //= Updates

    /**
     * When an update is reported, the corresponding entity ID
     * is stored and can later be retrieved by the consumer.

     * @param entityId 
     */
    public abstract notifyUpdate(entity: TypeEntity): void;

    /**
     * Gets all currently recorded updates.
     * 
     * This is a consuming call: after invocation, the 
     * observer contains no recorded updates until the next occurs.
    */
    public abstract consumeUpdateReports(): Iterable<number>;


    //= Creation

    /**
     * When a creation is reported, the corresponding entity ID
     * is stored and can later be retrieved by the consumer.

     * @param entityId 
     */
    public abstract notifyCreation(entity: TypeEntity): void;

    /**
     * Gets all currently recorded creations.
     * 
     * This is a consuming call: after invocation, the 
     * observer contains no recorded creations until the next occurs.
    */
    public abstract consumeCreationReports(): Iterable<number>;

}


//* Implementation 

/**
 * Observes changes to entities of a given type.
 *
 * Note on Updates:
 * Multiple updates to the same entity are coalesced,
 * so only the latest pending update for each entity is retained.
 */
export class EntityCollectionObserver<E extends Identifiable>
    implements IObserverEntityCollection<E> {

    constructor(
        private creationReports: Set<number>,
        private updateReports: Set<number>,
    ) { }


    public notifyCreation(entity: E): void {
        this.creationReports.add(entity.id);
    }

    public consumeCreationReports(): Iterable<number> {
        const it: Iterable<number> = this.creationReports.values();
        this.creationReports = new Set<number>();
        return it;
    }

    public notifyUpdate(entity: E): void {
        this.updateReports.add(entity.id);
    }

    public consumeUpdateReports(): Iterable<number> {
        const it: Iterable<number> = this.updateReports.values();
        this.updateReports = new Set<number>();
        return it;
    }

}