import { z } from "zod";
import { showAuthorSchema } from "./ShowAuthor.schema.js";
import { SHOW_EVENT_STATUS, SHOW_STATUS } from "../constants/Show.constants.js";
import { seasonSchema } from "../../season/models/Season.schema.js";

export const showSchema = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  season: seasonSchema,
  author: showAuthorSchema.optional(),
  openingDate: z.string().optional(),
  closingDate: z.string().optional(),
  eventStatus: z.nativeEnum(SHOW_EVENT_STATUS).optional(),
  status: z.nativeEnum(SHOW_STATUS).optional(),
});

export type Show = z.infer<typeof showSchema>;
