import { isPast, isValid, parseISO } from "date-fns";
import { PERFORMANCE_STATUS } from "./Performance.constants.js";
import { Performance } from "./Performance.Schema.js";

/**
 * Checks to see if this performance has been marked as "cancelled"
 */
export const isCancelledPerformance = <T extends Performance>(performance: T) => {
  const { status } = performance;
  return status === PERFORMANCE_STATUS.CANCELLED;
};

/**
 * Checks to see if this performance has been marked as "rescheduled"
 */
export const isRescheduledPerformance = <T extends Performance>(performance: T) => {
  const { status } = performance;
  return status === PERFORMANCE_STATUS.RESCHEDULED;
};

/**
 * Checks to see if this performance has been marked as "postponed"
 */
export const isPostponedPerformance = <T extends Performance>(performance: T) => {
  const { status } = performance;
  return status === PERFORMANCE_STATUS.POSTPONED;
};

/**
 * Is the starting time of this performance past the current date and time?
 */
export const isPastPerformance = <T extends Performance>(performance: T) => {
  const { startTime } = performance;

  const date = parseISO(startTime);

  return isValid(date) && isPast(date);
};

/**
 * Is this performance considered to be currently "available" to the public?
 */
export const isAvailablePerformance = <T extends Performance>(performance: T) => {
  return !isCancelledPerformance(performance) && !isPastPerformance(performance);
};

/**
 * Checks to see if the performance is a general admission performance.
 * * Currently any performance other than Pay What You Want
 */
export const isGeneralAdmissionPerformance = <T extends Performance>(performance: T) => {
  return !performance.isPWYW;
};

/**
 * Get the total number of performance occurrences for a single show
 */
export const getTotalPerformanceCount = <T extends Performance>(performances?: T[]) => {
  if (!performances) {
    return 0;
  }

  const total = performances.filter((performance) => !isCancelledPerformance(performance));

  return total.length;
};

/**
 * Get total ticketed performance count
 */
export const getTotalTicketedPerformanceCount = <T extends Performance>(performances?: T[]) => {
  if (!performances) {
    return 0;
  }

  const total = performances.filter((performance) => performance.isTicketed);

  return total.length;
};

/**
 * Get total pay what you want performance count
 */
export const getTotalPWYWPerformanceCount = <T extends Performance>(performances?: T[]) => {
  if (!performances) {
    return 0;
  }

  const total = performances.filter((performance) => performance.isPWYW);

  return total.length;
};

/**
 * Get the total number of performances still remaining that an audience member
 * could buy a ticket to.
 */
export const getRemainingPerformanceCount = <T extends Performance[]>(performances?: T) => {
  if (!performances) {
    return 0;
  }

  const remaining = performances.filter((performance) => isAvailablePerformance(performance));

  return remaining.length;
};

/**
 * The show has performances remaining
 */
export const hasPerformancesRemaining = <T extends Performance[]>(performances?: T) => {
  if (performances?.length === 0) {
    return false;
  }
  return getRemainingPerformanceCount(performances) > 0;
};

/**
 * Sort performances
 *
 * Sort past performances to the end of the array
 */
export const sortPastPerformancesToEnd = <T extends Performance[]>(performances: T) =>
  performances.sort((a, b) => {
    const { startTime: performanceA } = a;
    const { startTime: performanceB } = b;

    const dateA = parseISO(performanceA);
    const dateB = parseISO(performanceB);

    // If the first date is not in the past, but the second date is, sort the past date last (moving them to the end of the array)
    if (!isPast(dateA) && isPast(dateB)) {
      return -1;
    }

    return 0;
  });
