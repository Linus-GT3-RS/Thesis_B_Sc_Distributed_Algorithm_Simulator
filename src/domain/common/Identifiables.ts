// import TsMap from "ts-map";


// export abstract class IIdManager {

//     public abstract isValidNewId(id: number): boolean;

//     public abstract peakNextId(): number;

// }


// export abstract class IdentifiableStore<IdentifiableType extends Identifiable>
//     implements
//     IIdManager {

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