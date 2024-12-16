import { Artist } from "./Artist.schema.js";

/**
 * Takes an artist name object and composes it into a single string, removing any empty values
 */
export const getFullArtistName = (artist: Artist) => {
  const composedName = Object.values(artist.name).filter(Boolean).join(" ");
  return composedName;
};
