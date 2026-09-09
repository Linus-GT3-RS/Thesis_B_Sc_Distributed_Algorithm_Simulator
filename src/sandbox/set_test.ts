// import { Identifiable, IdentifiableError } from "../common/EntityStores.js";

// class MyA {
//     constructor(
//         public id: number,
//         public name: string
//     ) { }
// }

// const a: Identifiable = new MyA(10, "peter");


// function getVal(key: keyof Identifiable): void {
//     console.log(a[key]);
// }


// const keys: string[] = Object.keys(a);
// const myKey: string = "id";

// function isKey(key: string): boolean {
//     return keys.includes(key);
// }

// function keyDataType(key: string): void {
//     if (isKey(key)) {
//         const idk: unknown = ((a as unknown) as Record<string, unknown>)[key];
//         console.log(typeof idk);
//     }
//     else {
//         console.log("this is no key goofy");
//     }
// }

// keyDataType(myKey);