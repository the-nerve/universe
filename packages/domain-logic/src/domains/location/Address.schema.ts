import { z } from "zod";

export const addressSchema = z.object({
  city: z.string(),
  state: z.string(),
  stateCode: z.string(),
  street: z.string(),
  zipcode: z.string(),
});

export type Address = z.infer<typeof addressSchema>;
