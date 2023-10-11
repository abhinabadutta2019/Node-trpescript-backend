//////////ZOD setup starts/////
import { z } from "zod";
import { fromZodError } from "zod-validation-error";
//
const TaskSchema = z.object({
  title: z.string().min(5).default("null"),
  completed: z.boolean().default(false),
});
//
type OneTask = z.infer<typeof TaskSchema>;
//
const oneTask = { title: "a", completed: "play " };
//
try {
  console.log(TaskSchema.parse(oneTask), "response from zod");
} catch (err) {
  const validationError = fromZodError(err as z.ZodError);
  console.log(validationError);
}
