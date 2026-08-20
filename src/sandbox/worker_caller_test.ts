/// <reference types="node" />
import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

async function readCommands(): Promise<void> {
    const rl = readline.createInterface({ input, output });

    while (true) {
        const cmd = await rl.question("Command (A/B/C): ");

        switch (cmd.trim().toUpperCase()) {
            case "A":
                console.log("Executing cmdA");
                break;

            case "B":
                console.log("Executing cmdB");
                break;

            case "C":
                console.log("Executing cmdC");
                break;

            default:
                console.log("Unknown command");
        }
    }
}

readCommands();