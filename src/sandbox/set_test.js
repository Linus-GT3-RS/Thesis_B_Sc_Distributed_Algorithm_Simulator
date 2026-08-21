class MyA {
    id;
    name;
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
}
const a = new MyA(10, "peter");
function getVal(key) {
    console.log(a[key]);
}
const keys = Object.keys(a);
const myKey = "id";
function isKey(key) {
    return keys.includes(key);
}
function keyDataType(key) {
    if (isKey(key)) {
        const idk = a[key];
        console.log(typeof idk);
    }
    else {
        console.log("this is no key goofy");
    }
}
keyDataType(myKey);
export {};
