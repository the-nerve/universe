import { z } from "zod";
import { addressSchema } from "./Address.schema.js";
import { geoLocationSchema } from "./GeoLocation.schema.js";

export const locationSchema = z.object({
  name: z.string(),
  googleTitle: z.string().optional(),
  address: addressSchema,
  geolocation: geoLocationSchema.optional(),
  indigenousLandAck: z.string().optional(),
});

export type Location = z.infer<typeof locationSchema>;
