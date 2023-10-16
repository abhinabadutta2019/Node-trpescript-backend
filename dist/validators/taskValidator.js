"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskSchema = void 0;
//////////ZOD setup starts/////
const zod_1 = require("zod");
// import { fromZodError } from "zod-validation-error";
//
exports.TaskSchema = zod_1.z.object({
    name: zod_1.z.string().min(5),
    description: zod_1.z.string().min(10),
    completed: zod_1.z.boolean().optional().default(false),
    // slot: z.string().optional(),
    slot: zod_1.z.enum(["morning", "evening", "night"]).optional().default("night"),
});
// with custom error message
// export const TaskSchema = z.object({
//   name: z.string().min(5, { message: "Must be 5 or more characters long" }),
//   completed: z.boolean({
//     required_error: "completed is required",
//     invalid_type_error: "completed must be a boolean",
//   }),
// });
// export type OneTask = z.infer<typeof TaskSchema>;
// type OneTask = z.infer<typeof TaskSchema>;
// //
// const oneTask = { title: "a", completed: "play " };
// //
// try {
//   console.log(TaskSchema.parse(oneTask), "response from zod");
// } catch (err) {
//   const validationError = fromZodError(err as z.ZodError);
//   console.log(validationError);
