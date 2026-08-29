import Queue from "yocto-queue";

function sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(() => { console.log("timer finished"); resolve(); }, ms));
}

export enum Command {
    A, B, C
}

enum QueueAction {
    RequeueCommand,
    DequeueCommand
}

class CommandExecutioner {

    public async handleCommandInstant(cmd: Command): Promise<QueueAction> {
        switch (cmd) {
            case Command.A:
                console.log("execution command a");
                return QueueAction.DequeueCommand;

            case Command.B:
                console.log("execution command b");
                return QueueAction.DequeueCommand;

            case Command.C:
                console.log("execution command c");
                return QueueAction.RequeueCommand;
        }
    }

}

export class CommandManager {

    constructor(
        private queue: Queue<Command> = new Queue<Command>(),
        private isIdle: boolean = true,

        private executioner: CommandExecutioner = new CommandExecutioner(),
    ) { }


    public async onCmd(cmd: Command): Promise<void> {
        this.queue.enqueue(cmd);
        console.log(`queue size is ${this.queue.size}`);

        if (this.isIdle) {

            while (this.queue.size !== 0) {
                console.log(`queue size is ${this.queue.size}`);
                this.isIdle = false;
                const queueAction: QueueAction = await this.executioner.handleCommandInstant(this.queue.peek()!);

                if (queueAction === QueueAction.RequeueCommand) { //! todo move somehow to next cmd ... nomma durchdenke
                    await sleep(10);

                }
                else if (queueAction === QueueAction.DequeueCommand) {
                    this.queue.dequeue();
                }
            }

            this.isIdle = true;

        }

    }

}
