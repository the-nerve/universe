import { z } from "zod";

export const artistSchema = z.object({
  instagramHandle: z.string().optional(),
  name: z.object({
    first: z.string(),
    middle: z.string().optional(),
    last: z.string(),
  }),
  pronouns: z.string(),
  tiktokHandle: z.string().optional(),
  twitterHandle: z.string().optional(),
  websiteUrl: z.string().optional(),
});

export type Artist = z.infer<typeof artistSchema>;
