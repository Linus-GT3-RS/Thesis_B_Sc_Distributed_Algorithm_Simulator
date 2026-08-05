// import TsMap from "ts-map";





// export abstract class IIdManager {

//     public abstract isValidNewId(id: number): boolean;

//     public abstract peakNextId(): number;

// }



// export abstract class IIdentifiableManager {

//     public abstract insertIdentifiable(item: Identifiable): boolean;

//     public abstract peakItem(id: number): Readonly<Identifiable> | null;

//     public abstract popItem(id: number): Identifiable | null;

// }



// export abstract class IdentifiableStore<IdentifiableType extends Identifiable>
//     implements
//     IIdManager,
//     IIdentifiableManager {

//     //* ----------------------------------------
//     //* IIdentifiableManager Impl

//     private items: TsMap<number, IdentifiableType> = new TsMap();

//     // inserts item 
//     // if id is valid
//     public insertIdentifiable(item: IdentifiableType): boolean {
//         if (!this.isValidNewId(item.id)) {
//             return false;
//         }

//         // insert
//         this.items.set(item.id, item);

//         // update nextItemID
//         if (item.id >= this.nextItemID) {
//             this.nextItemID = item.id + 1;
//         }
//         return true;
//     }

//     // returns readonly accessor for item
//     // if item with given id exists
//     public peakItem(id: number): Readonly<IdentifiableType> | null {
//         const item = this.items.get(id);
//         if (item !== undefined) {
//             return item;
//         }
//         return null;
//     }

//     // returns item
//     // after removing it from internal items
//     // if id is valid
//     public popItem(id: number): IdentifiableType | null {
//         const item = this.items.get(id);
//         if (item !== undefined) {
//             this.items.delete(id);
//             return item;
//         }
//         return null;
//     }


//     //* ----------------------------------------
//     //* IInternalIDManager Impl

//     private nextItemID = 0;

//     // id is valid if
//     // >= 0
//     // - not in items
//     public isValidNewId(id: number): boolean {
//         return (id >= 0) && !this.items.has(id);
//     }

//     // returns next unused valid id
//     public peakNextId(): number {
//         return this.nextItemID;
//     }

// }