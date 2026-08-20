

export abstract class IHandlerTestCmd {

    public abstract handleTest(text: string): void;
}

export class GenericGraphconfigState
    implements IHandlerTestCmd {

    public handleTest(text: string): void {
        console.log(text);
    }

}