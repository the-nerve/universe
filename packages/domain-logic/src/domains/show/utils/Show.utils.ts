import { compareAsc, compareDesc, isFuture, isPast, isWithinInterval, parseISO, sub } from "date-fns";
import { Show } from "../models/Show.schema.js";
import { SHOW_STATUS } from "../constants/Show.constants.js";

/**
 * Filter that returns only shows that are in the future
 *
 * @external date-fns.isFuture
 * @external date-fns.parseISO
 *
 * @param shows An array of shows to filter
 * @returns An array of shows that are in the future
 */
export const getFutureShows = <T extends Show[]>(shows: T) => {
  return shows.filter(({ closingDate }) => {
    if (!closingDate) {
      return false;
    }

    const date = parseISO(closingDate);
    return isFuture(date);
  });
};

/**
 * Filter that returns only shows that are in the past
 *
 * @external date-fns.isPast
 * @external date-fns.parseISO
 *
 * @param shows An array of shows to filter
 * @returns An array of shows that are in the past
 */
export const getPastShows = <T extends Show[]>(shows: T) => {
  return shows.filter(({ closingDate }) => {
    if (!closingDate) {
      return false;
    }

    const date = parseISO(closingDate);
    return isPast(date);
  });
};
/**
 * Sort shows from newest to oldest based on their opening and closing performance dates
 *
 * @external date-fns.compareAsc
 * @external date-fns.compareDesc
 *
 * @param shows An array of shows to sort
 * @return An array of shows sorted by their closing date
 */
export const sortShowsByClosingDate = <T extends Show[]>(shows: T, order = "desc") =>
  shows.sort((a, b) => {
    const { closingDate: showA } = a;
    const { closingDate: showB } = b;

    if (!showA || !showB) {
      return 0;
    }

    const dateA = parseISO(showA);
    const dateB = parseISO(showB);

    return order === "desc" ? compareDesc(dateA, dateB) : compareAsc(dateA, dateB);
  });

/**
 * Determine if the show is in the past
 *
 * @external date-fns.isPast
 * @external date-fns.parseISO
 *
 * @param show The show to check
 * @returns True if the show is in the past, false otherwise
 */
export const isPastShow = <T extends Show>({ closingDate }: T) => {
  if (!closingDate) {
    return false;
  }

  const closing = parseISO(closingDate);
  return isPast(closing);
};

/**
 * Determine if the show is active, meaning it is currently running ("now playing")
 *
 * @external date-fns.isWithinInterval
 * @external date-fns.parseISO
 *
 * @param show The show to check
 * @returns True if the show is active, false otherwise
 */
export const isActiveShow = <T extends Show>({ openingDate, closingDate }: T) => {
  if (!openingDate || !closingDate) {
    return false;
  }

  const interval = {
    start: new Date(openingDate),
    end: new Date(closingDate),
  };
  return isWithinInterval(new Date(), interval);
};

/**
 * Determine if the show is "coming soon" meaning it will be opening soon
 *
 * @external date-fns.isWithinInterval
 * @external date-fns.sub
 *
 * @param show The show to check
 * @returns True if the show is coming soon, false otherwise
 */
export const isComingSoonShow = <T extends Show>({ openingDate, closingDate }: T) => {
  if (!openingDate || !closingDate) {
    return false;
  }

  // How many days before a show opens should we consider a show "upcoming"?
  const COMING_SOON_WINDOW_DAYS = 60;
  // How many hours before a show officially opens should we still consider it "upcoming" instead of "now playing"?
  const COMING_SOON_CUTOFF_HOURS = 12;

  const opening = new Date(openingDate);
  const closing = new Date(closingDate);

  const interval = {
    start: sub(opening, {
      days: COMING_SOON_WINDOW_DAYS,
    }),
    end: sub(closing, { days: COMING_SOON_CUTOFF_HOURS }),
  };

  return isWithinInterval(new Date(), interval);
};

/**
 * Determine the status of a show using the open and close dates
 *
 * @see SHOW_STATUS
 * @see isPastShow
 * @see isActiveShow
 * @see isComingSoonShow
 *
 * @param openDate The opening performance datetime
 * @param closeDate The closing performance datetime
 *
 * @returns The status of the show
 */
export const getShowStatus = <T extends Show>(show: T) => {
  const { openingDate, closingDate } = show;

  // If no performances are passed in, bail.
  if (!openingDate || !closingDate) {
    return SHOW_STATUS.DEFAULT;
  }

  if (isPastShow(show)) return SHOW_STATUS.PAST;
  if (isActiveShow(show)) return SHOW_STATUS.ACTIVE;
  if (isComingSoonShow(show)) return SHOW_STATUS.COMING_SOON;

  return SHOW_STATUS.FUTURE;
};

/**
 * Create a getter function that returns the path for a given show
 *
 * @param baseSlug The base slug for the path
 * @returns A function that takes a show and returns the full path
 */
export const createGetShowPath = <T extends Show>(baseSlug: string) => {
  const getShowPath = ({ slug, season }: T) => {
    return `/${baseSlug}/${slug}/${season.slug}`;
  };

  return { getShowPath };
};

/**
 * Get the next show in the list
 *  - Assumes the provided shows list is ordered by show closing date
 *
 * @param shows The sorted list of all shows
 * @param show The current show
 * @returns The next show in the list or null if there is no next show
 */
export const getNextShow = <T extends Show>(shows: T[], show: T) => {
  const currentIndex = shows.findIndex((s) => s.id === show.id);
  const nextIndex = currentIndex + 1;

  if (nextIndex >= shows.length) {
    return null;
  }

  return shows[nextIndex];
};

/**
 * Get the previous show in the list
 * - Assumes the provided shows list is ordered by show closing date
 *
 * @param shows The sorted list of all shows
 * @param show The current show
 * @returns The previous show in the list or null if there is no previous show
 */
export const getPreviousShow = <T extends Show>(shows: T[], show: T) => {
  const currentIndex = shows.findIndex((s) => s.id === show.id);
  const previousIndex = currentIndex - 1;

  if (previousIndex < 0) {
    return null;
  }

  return shows[previousIndex];
};

/**
 * Get the show number in the list
 * - Assumes the provided shows list is ordered by show closing date
 *
 * @param shows The sorted list of all shows
 * @param show The current show
 * @returns The show number in the list
 */
export const getShowNumber = <T extends Show>(shows: T[], show: T) => {
  const currentIndex = shows.findIndex((s) => s.id === show.id);
  return currentIndex + 1;
};
