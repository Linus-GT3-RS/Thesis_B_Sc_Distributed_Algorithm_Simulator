import Queue from 'yocto-queue';

export abstract class IAlgorithmActionHandler {

    public abstract handleAction(action: unknown): void;

}

export abstract class IAlgorithmActionManager {

    public abstract getDrainIterator(): IterableIterator<unknown>;

}

export class AlgorithmActionHandler
    implements
    IAlgorithmActionHandler,
    IAlgorithmActionManager {

    constructor(
        private queue: Queue<unknown>,
    ) { }

    public handleAction(action: unknown): void {
        this.queue.enqueue(action);
    }

    public getDrainIterator(): IterableIterator<unknown> {
        return this.queue.drain();
    }

}