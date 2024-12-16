import { Location } from "./Location.schema.js";

const GMAPS_DIRECTIONS_BASE_URL = "https://www.google.com/maps/dir/?api=1&destination=";

/**
 * Create a Google Maps URL to generate pre-filled directions to a given destination.
 * Google requirements: https://developers.google.com/maps/url-encoding
 */
export const getGoogleMapsLocationDirectionsUrl = (location: Location) => {
  const { googleTitle, address } = location;

  const addressString = `${address.street} ${address.city} ${address.stateCode} ${address.zipcode}`;

  // MUST match a valid registered business in google or this will break
  const businessTitle = googleTitle?.toLowerCase();

  const locationString = businessTitle ? `${businessTitle} ${addressString}` : addressString;

  // Google needs white space encoded as +
  const googleFriendlyLocationString = locationString.replace(/\s/g, "+");

  const locationURL = `${GMAPS_DIRECTIONS_BASE_URL}${googleFriendlyLocationString}`;

  return encodeURI(locationURL);
};
