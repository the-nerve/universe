import { z } from "zod";
import { TICKETING_PURCHASE_TYPE, TICKETING_STATUS } from "./Ticketing.constants.js";
import { ticketingExternalProviderSchema } from "./TicketingExternalProvider.schema.js";

export const ticketingSchema = z.object({
  purchaseType: z.nativeEnum(TICKETING_PURCHASE_TYPE).optional(),
  status: z.nativeEnum(TICKETING_STATUS).optional(),
  basePrice: z.number().optional(),
  salePrice: z.number().optional(),
  industryPrice: z.number().optional(),
  studentPrice: z.number().optional(),
  link: z.string().optional(),
  externalProvider: ticketingExternalProviderSchema.optional(),
});

export type Ticketing = z.infer<typeof ticketingSchema>;
