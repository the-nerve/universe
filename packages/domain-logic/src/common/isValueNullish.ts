/**
 * Check if a value is null or undefined.
 *
 * @param value The value to check
 * @returns `true` if the value is null or undefined, `false` otherwise.
 */
export const isValueNullish = (value: unknown): value is null | undefined => {
  // Using == is usually advised against but in this case it's the right tool for the job,
  // as we want to loosely check for both null and undefined.
  return value == null;
};
