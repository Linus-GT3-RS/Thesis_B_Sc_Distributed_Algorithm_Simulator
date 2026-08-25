
abstract class I1 {

    public abstract dostuff1(): void;
}

abstract class I2 {

    public abstract dostuff2(): void;
}




class I1Handler implements I1 {

    public dostuff1(): void {
        console.log("hi from 1");
    }

}

class I2Handler implements I2 {

    public dostuff2(): void {
        console.log("hi from 2");
    }

}

class I12Handler implements I1, I2 {

    public dostuff1(): void {
        console.log("hi from 3 in dostuff 1");
    }

    public dostuff2(): void {
        console.log("hi from 3 in dostuff2");
    }

}


// main
const mine1: I1Handler = new I1Handler();
const mine2: I2Handler = new I2Handler();
const mine3: I12Handler = new I12Handler();

let current: unknown = mine1;
console.log(current instanceof I1);
console.log(current instanceof I2);

current = mine2;
console.log(current instanceof I1);
console.log(current instanceof I2);

current = mine3;
console.log(current instanceof I1);
console.log(current instanceof I2);