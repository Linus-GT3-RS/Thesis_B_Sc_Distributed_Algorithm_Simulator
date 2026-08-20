

const mySet: Set<number> = new Set();
mySet.add(5);
console.log(mySet);
mySet.add(5);
console.log(mySet);
mySet.add(4);
console.log(mySet);

console.log("");
for (const n of mySet) {
    console.log(n);
}

mySet.delete(5);
console.log(mySet);
console.log(mySet.has(4));
console.log(mySet.has(5));
mySet.clear();
console.log(mySet);

