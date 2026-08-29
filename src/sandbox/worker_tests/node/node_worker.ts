import { parentPort } from "node:worker_threads";
import { Command, CommandManager } from "../my_command_logic.js";

const commandManager: CommandManager = new CommandManager();




parentPort!.on("message", async (message) => {
    console.log(`\n\nNodeWorker received: ${message}\n`);

    if (message === "a") {
        await commandManager.onCmd(Command.A);
    }
    else if (message === "b") {
        await commandManager.onCmd(Command.B);
    }
    else if (message === "c") {
        await commandManager.onCmd(Command.C);
    }
    else if (message.myVal === 5) {
        console.log("this works wow");
    }
    else {
        await console.log("cannot handle command"); // todo await?
    }
});