import { ShowWithMetadata } from "../models/ShowWithMetadata.schema.js";

/**
 * Format the duration of a show for friendly display
 */
export const formatDurationDisplay = <T extends ShowWithMetadata>(show: T) => {
  const { duration } = show;

  if (!duration || (!duration.hours && !duration.minutes)) {
    return {
      hours: undefined,
      minutes: undefined,
    };
  }

  // Handle plurality for hours (we can assume minutes will always be plural)
  const hoursSuffix = duration.hours && duration.hours === 1 ? "hour" : "hours";
  const minutesSuffix = "minutes";

  const _hours = duration.hours && duration.hours > 0 ? `${duration.hours} ${hoursSuffix}` : undefined;
  const _minutes = duration.minutes && duration.minutes > 0 ? `${duration.minutes} ${minutesSuffix}` : undefined;

  return {
    hours: _hours,
    minutes: _minutes,
  };
};
