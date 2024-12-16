import { z } from "zod";
import { PERFORMANCE_STATUS } from "./Performance.constants.js";

export const performanceSchema = z.object({
  startTime: z.string(),
  status: z.nativeEnum(PERFORMANCE_STATUS),
  isPreview: z.boolean().optional(),
  isPWYW: z.boolean().optional(),
  hasTalkback: z.boolean().optional(),
  hasAssistedListening: z.boolean().optional(),
  duration: z
    .object({
      hours: z.number().optional(),
      minutes: z.number().optional(),
    })
    .optional(),
  isTicketed: z.boolean().optional(),
});

export type Performance = z.infer<typeof performanceSchema>;
