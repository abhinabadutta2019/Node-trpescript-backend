"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//////////ZOD setup starts/////
const zod_1 = require("zod");
//
const TaskSchema = zod_1.z.object({
    title: zod_1.z.string().min(5).default("null"),
    completed: zod_1.z.boolean().default(false),
});
// type OneTask = z.infer<typeof TaskSchema>;
// //
// const oneTask = { title: "a", completed: "play " };
// //
// try {
//   console.log(TaskSchema.parse(oneTask), "response from zod");
// } catch (err) {
//   const validationError = fromZodError(err as z.ZodError);
//   console.log(validationError);
// }
