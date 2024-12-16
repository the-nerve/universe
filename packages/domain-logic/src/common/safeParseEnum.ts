// Define the result type that mimics Zod's safeParse behavior
type ParseResult<T> = { success: true; data: T } | { success: false; error: string };

/**
 * Safely parses a string as an enum member, returning a result object similar to Zod's safeParse
 *
 * @param enumType Enum type to check against
 * @param value String to attempt to parse as enum member
 * @returns success: true and the parsed enum member if successful, success: false and an error message if unsuccessful
 */
export const safeParseStringAsEnumMember = <T extends {}>(enumType: T, value: string): ParseResult<T[keyof T]> => {
  if (Object.values(enumType).includes(value as T[keyof T])) {
    return { success: true, data: value as T[keyof T] }; // Return parsed value
  }
  return { success: false, error: `Provided value "${value}" is not member of enum "${enumType}"` };
};
