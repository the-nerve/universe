/**
 * Registers a plop helper that converts a string to an integer.
 */
export const toInt = (
  /** @type {import('plop').NodePlopAPI} */
  plop
) => {
  plop.setHelper('toInt', function (string) {
    return parseInt(string);
  });
};
