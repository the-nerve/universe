import { z } from "zod";

export const ticketingExternalProviderSchema = z.object({
  name: z.string(),
  websiteUrl: z.string(), // the company URL, not the ticket URL
  description: z.string().optional(),
  email: z.string().optional(),
  phone: z.string().optional(),
  note: z.unknown().optional(),
});

export type TicketingExternalProvider = z.infer<typeof ticketingExternalProviderSchema>;
