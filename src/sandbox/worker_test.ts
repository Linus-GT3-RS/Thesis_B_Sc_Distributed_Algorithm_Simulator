// import { parentPort } from "node:worker_threads";

// function sleep(ms: number): Promise<void> {
//     return new Promise(resolve => setTimeout(resolve, ms));
// }

// parentPort?.on("message", async (command) => {
//     switch (command.type) {
//         case "A":
//             console.log("Executing A");
//             break;

//         case "B":
//             console.log("Starting B");
//             await sleep(2000);
//             console.log("Finished B");
//             break;

//         case "C":
//             console.log("Executing C");
//             break;
//     }
// });