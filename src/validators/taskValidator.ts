//////////ZOD setup starts/////
import { z } from "zod";
// import { fromZodError } from "zod-validation-error";
//
export const TaskSchema = z.object({
  name: z.string().min(5),
  completed: z.boolean(),
  description: z.string().optional(),
  slot: z.string().optional(),
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
