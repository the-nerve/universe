import { z } from "zod";

export const geoLocationSchema = z.object({
  lat: z.string(),
  lng: z.string(),
});

export type GeoLocation = z.infer<typeof geoLocationSchema>;
