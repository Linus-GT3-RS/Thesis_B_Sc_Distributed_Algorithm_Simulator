import * as z from "zod";

// test cmd schema definition
const MyCmdZodSchema = z.object({
    myVal: z.string(),
    myNum: z.number(),
});
type MyCmd = z.infer<typeof MyCmdZodSchema>




const MyCmdBaseZodSchema = z.object({
    type: z.string(),
});
type MyCmdBase = z.infer<typeof MyCmdBaseZodSchema>



const idk: any = {};
const parse = MyCmdBaseZodSchema.safeParse(idk); // returns deep clone
parse.data?.type