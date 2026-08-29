/// <reference types="node" />
import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { Worker } from "node:worker_threads";

const worker = new Worker(
    new URL("./node_worker.js", import.meta.url)
);

class MyE {
    constructor(
        public myVal: number
    ) { }
}

async function readCommands(): Promise<void> {
    const rl = readline.createInterface({ input, output });

    while (true) {
        const cmd = await rl.question("Command (A/B/C): ");

        switch (cmd.trim().toLowerCase()) {
            case "a":
                console.log("input is cmdA");
                worker.postMessage("a");
                break;

            case "b":
                console.log("input is cmdB");
                worker.postMessage("b");
                break;

            case "c":
                console.log("input is cmdC");
                worker.postMessage("c");
                break;

            case "d":
                console.log("input cmd is d");
                worker.postMessage({ myVal: "4" });
                break;

            case "e":
                console.log("input cmd is e");
                worker.postMessage(new MyE(5));
                break;

            default:
                console.log("Unknown command");
        }
    }
}


// Main
worker.postMessage("test");
readCommands();