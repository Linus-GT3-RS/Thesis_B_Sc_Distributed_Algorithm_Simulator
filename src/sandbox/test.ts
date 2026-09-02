import z from "zod"


interface MyMsg {
    type: string,
    data: unknown
}

class Msg implements MyMsg {
    constructor(
        public type: string,
        public data: unknown,
    ) { }
}

class InvalidMsg {
    constructor(
        public type: string,
        public value: unknown,
    ) { }
}

const MsgSchema = z.object({
    type: z.string(),
    data: z.unknown(),
});



// Main
const o1 = { type: "t1", data: 2 };
const o2 = { type: "t1", data: "value" };
const c1: Msg = new Msg("t2", 2);
const c2: Msg = new Msg("t2", "hi");

const inv1 = { type: "t1", value: 2 };
const inv2: InvalidMsg = new InvalidMsg("t2", "hi");

MsgSchema.parse(o1);
MsgSchema.parse(o2);
MsgSchema.parse(c1);
MsgSchema.parse(c2);

MsgSchema.parse(inv1);
MsgSchema.parse(inv2);

