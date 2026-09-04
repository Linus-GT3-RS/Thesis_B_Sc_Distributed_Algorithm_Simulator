
let a = [1, 2, 3, 4];

let s = new Set<number>();
s.add(2).add(3);

const is: Iterable<number> = s.values();
const ia: Iterable<number> = a.values();

a = [];
s = new Set<number>();

for (const elem of is) {
    console.log(elem);
}

for (const elem of ia) {
    console.log(elem);
}

console.log(a)
console.log(s)
