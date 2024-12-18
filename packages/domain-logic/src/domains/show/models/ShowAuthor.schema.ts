import { z } from "zod";

export const showAuthorSchema = z.object({
  name: z.string(),
  bioLink: z.string().optional(),
});

export type ShowAuthor = z.infer<typeof showAuthorSchema>;
