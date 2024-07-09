import { z } from "zod";

export const formAddUserSchema = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  age: z.number().positive({
    message: "Age must be positive.",
  }).min(18, {
    message: "Age must be grater than 18.",
  }),
})

export interface IUser {
  id: string,
  name: string,
  age: number,
}