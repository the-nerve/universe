import { ShowWithMetadata } from "../models/ShowWithMetadata.schema.js";

/**
 * Checks to see if this show has an intermission
 */
export const hasIntermission = <T extends ShowWithMetadata>(show: T) => {
  return show.intermissionCount && show.intermissionCount > 0;
};
