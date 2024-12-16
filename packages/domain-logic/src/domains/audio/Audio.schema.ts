import { z } from "zod";

// ============== MODEL DEFS ============== //

export const audioCreditSchema = z.object({
  description: z.string().optional(),
  instagramHandle: z.string().optional(),
  name: z.string(),
  role: z.string(), // role of the person in the audio creation
  tiktokHandle: z.string().optional(),
  twitterHandle: z.string().optional(),
  websiteUrl: z.string().optional(),
});

export const audioSchema = z.object({
  id: z.string(), // unique identifier for the audio
  description: z.string().optional(),
  link: z.string().optional(), // link to the audio
  platform: z.string(), // platform where the audio is hosted
  credits: z.array(audioCreditSchema).optional(),
});

export type AudioCredit = z.infer<typeof audioCreditSchema>;
export type Audio = z.infer<typeof audioSchema>;
