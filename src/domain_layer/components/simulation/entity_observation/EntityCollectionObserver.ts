
//* Interfaces

import type { Identifiable } from "@/common/EntityStores";

export abstract class IChangeObserverCollection
    <Entity extends Identifiable> {

    /**
     * When a change is reported, the corresponding entity ID
     * is stored.
     * 
     * @param entityId 
    */
    public abstract notifyChange(entity: Entity): void;

}

export abstract class IChangeReportProvider {

    /**
     * Gets all currently recorded changes.
     * 
     * This is a consuming call: after invocation, the 
     * observer contains no records until the next occurs.
    */
    public abstract consumeChangeReports(): Iterable<number>;

}


//* Implementations

//= Lazy Change Observer
/**
 * Observes changes to entities of a given type.
 *
 * Note:
 * Multiple changes to the same entity are coalesced,
 * so only one is retained.
 */
export class LazyChangeObserverCollection<E extends Identifiable>
    implements
    IChangeObserverCollection<E>,
    IChangeReportProvider {

    constructor(
        private changeReports: Set<number>,
    ) { }

    public notifyChange(entity: E): void {
        this.changeReports.add(entity.id);
    }

    public consumeChangeReports(): Iterable<number> {
        const it: Iterable<number> = this.changeReports.values();
        this.changeReports = new Set<number>();
        return it;
    }

}



//= Cascading Change Observer

/**
 * Observer for an entity type
 * that has a dependent type:
 *
 * if a change to an entity of @type {Observed} is 
 * reported, all entities of @type {Dependent} that depend 
 * on this entity are reported as changed as well (cascading)
 * 
 */
export class CascadingChangeObserverCollection<
    ObservedEntity extends Identifiable,
    DependentEntity extends Identifiable
>
    implements
    IChangeObserverCollection<ObservedEntity>,
    IChangeReportProvider {

    constructor(
        private changeReportsObservedColl: Set<number>,
        private changeObsDependents: IChangeObserverCollection<DependentEntity>,
        private getAllDependingEntites: (observable: Readonly<ObservedEntity>) => Iterable<Readonly<DependentEntity>>,
    ) { }

    public notifyChange(observable: ObservedEntity): void {
        this.changeReportsObservedColl.add(observable.id);

        for (const dependent of this.getAllDependingEntites(observable)) {
            this.changeObsDependents.notifyChange(dependent);
        }
    }

    public consumeChangeReports(): Iterable<number> {
        const it: Iterable<number> = this.changeReportsObservedColl.values();
        this.changeReportsObservedColl = new Set<number>();
        return it;
    }
}