/**
 * Parses a string as an enum member
 *
 * @throws Error if the provided string is not a valid member of the enum
 * @param enumType Enum type to check against
 * @param value String to attempt to parse as enum member
 * @returns Parsed enum member
 */
export const parseStringAsEnumMember = <T extends {}>(enumType: T, value: string): T[keyof T] => {
  // Type assertion to ensure proper type inference
  if (Object.values(enumType).includes(value as T[keyof T])) {
    return value as T[keyof T]; // Return the enum value
  }
  throw new Error(`[parseStringAsEnumMember] Provided string ${value} is not a valid member of ${enumType}`);
};
