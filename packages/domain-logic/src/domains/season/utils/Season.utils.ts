import { Season } from "../models/Season.schema.js";

/**
 * Create a getter function that returns the path for a given season
 *
 * @param baseSlug The base slug for the path
 * @returns A function that takes a season and returns the full path
 */
export const createGetSeasonPath = (baseSlug: string) => {
  const getSeasonPath = (season: Season) => {
    return `/${baseSlug}/${season.slug}`;
  };

  return { getSeasonPath };
};

/**
 * Get the next season in the list
 * - Assumes the provided seasons list is ordered by season start date
 *
 * @param seasons The list of all seasons
 * @param season The current season
 *
 * @returns The next season in the list or null if there is no next season
 */
export const getNextSeason = <T extends Season>(seasons: T[], season: T) => {
  const currentIndex = seasons.findIndex((s) => s.id === season.id);
  const nextIndex = currentIndex + 1;

  if (nextIndex >= seasons.length) {
    return null;
  }

  return seasons[nextIndex];
};

/**
 * Get the previous season in the list
 * - Assumes the provided seasons list is ordered by season start date
 *
 * @param seasons The list of all seasons
 * @param season The current season
 *
 * @returns The previous season in the list or null if there is no previous season
 */
export const getPreviousSeason = <T extends Season>(seasons: T[], season: T) => {
  const currentIndex = seasons.findIndex((s) => s.id === season.id);
  const previousIndex = currentIndex - 1;

  if (previousIndex < 0) {
    return null;
  }

  return seasons[previousIndex];
};

/**
 * Get the season number in the list
 * - Assumes the provided seasons list is ordered by season start date
 *
 * @param seasons The sorted list of all seasons
 * @param season The current season
 * @returns The season number in the list
 */
export const getSeasonNumber = <T extends Season>(seasons: T[], season: T) => {
  const currentIndex = seasons.findIndex((s) => s.id === season.id);
  return currentIndex + 1;
};
