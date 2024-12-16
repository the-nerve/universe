import { toInt } from './core/setHelper/toInt.mjs';

/**
 * Registers an array of helpers with plop.
 *
 * Check out the setHelper docs for more info on registering helpers:
 * @see https://plopjs.com/documentation/#sethelper
 *
 * @param {*} plop
 */
export const registerHelpers = (
  /** @type {import('plop').NodePlopAPI} */
  plop
) => {
  const helpers = [toInt];

  helpers.forEach((helper) => helper(plop));
};
