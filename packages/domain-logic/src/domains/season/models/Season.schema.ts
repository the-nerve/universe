import { z } from "zod";

export const seasonSchema = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
});

export type Season = z.infer<typeof seasonSchema>;
