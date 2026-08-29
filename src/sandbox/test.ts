
async function sleep(ms: number): Promise<number> {
    // // return new Promise(resolve => setTimeout(() => { console.log("timer finished") }, ms));
    // return new Promise<void>(() => { console.log("promise execution") });
    return 5;
}


function print(msg: string): void {
    console.log(msg);
}

async function f1(): Promise<void> {
    print("before");
    await sleep(1000);
    print("after");
}

await f1();
print("end");

setTimeout(() => { console.log("timer finished") }, 1000);