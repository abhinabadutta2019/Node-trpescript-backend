import { z } from "zod";

export const UserSchema = z.object({
  name: z.string(),
  password: z.string().min(5),
});

export type IUser = z.infer<typeof UserSchema>;
