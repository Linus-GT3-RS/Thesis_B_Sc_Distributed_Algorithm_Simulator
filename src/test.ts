

class A {
    constructor(
        public num: number
    ) { }

    public change(): void {
        this.num = 5;
    }
}

// function b(a: Readonly<A>): void {
//     a.change();
//     a.num = 5;

//     const a2 = a;
//     a2.num
// }

// const a = new A(5);
// console.log(a);
// b(a);
// console.log(a);

class B {
    constructor(
        public n: string
    ) { }
}

const b = new B("");

console.log(!(b instanceof B));
console.log(b instanceof A);