import { z } from "zod";
import { showSchema } from "../../show/models/Show.schema.js";

export const seasonWithMetadataSchema = showSchema.extend({
  tagline: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  shows: z.array(showSchema).optional(),
});

export type SeasonWithMetadata = z.infer<typeof seasonWithMetadataSchema>;
