
export abstract class IAlgorithmActionHandler {

    // throws error
    public abstract handleAction(action: unknown): void;

}

export class AlgorithmActionHandler implements IAlgorithmActionHandler {

    public handleAction(action: unknown): void {
        // todo
        throw new Error();
    }

}