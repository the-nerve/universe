import { z } from "zod";
import { showSchema } from "./Show.schema.js";
import { SHOW_RATING } from "../constants/Show.constants.js";

export const showWithMetadataSchema = showSchema.extend({
  duration: z
    .object({
      hours: z.number().optional(),
      minutes: z.number().optional(),
    })
    .optional(),
  generalTicketLink: z.string().optional(),
  hasDigitalProgram: z.boolean().optional(),
  hasPhysicalProgram: z.boolean().optional(),
  intermissionCount: z.number().optional(),
  openingDate: z.string().optional(),
  rating: z.nativeEnum(SHOW_RATING).optional(),
  teaser: z.string().optional(),

  // More open-ended fields for additional information
  announcement: z.string().optional(),
  contentAdvisory: z.string().optional(),
  effectsAdvisory: z.string().optional(),
  healthNotice: z.string().optional(),
  triggerWarning: z.string().optional(),
  additionalNotes: z.array(z.string()).optional(),
});

export type ShowWithMetadata = z.infer<typeof showWithMetadataSchema>;
