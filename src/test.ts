class NodeContext<T> {
    constructor(
        private readonly data: T
    ) { }

    get<K extends keyof T>(property: K): T[K] {
        return this.data[property];
    }

    update<K extends keyof T>(property: K, value: T[K]): void {
        // create action / request update
    }
}

class A {
    constructor(
        public a: number,
        public b: string,
        public c: boolean,
    ) {
        console.log(typeof this.a)
    }

    test(a: Readonly<number>) {
        a + 2
    }
}



const myA: A = new A(1, "hi", true);
const contx = new NodeContext<A>(myA);
const res: string = contx.get("b");


