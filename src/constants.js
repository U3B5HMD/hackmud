import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * @memberof constants
 */
export const unlockCommands = [
    "unlock",
    "release",
    "open"
];

/**
 * @memberof constants
 * @type {Color[]}
 */
export const colors = [
    "red",
    "orange",
    "yellow",
    "lime",
    "green",
    "cyan",
    "blue",
    "purple"
];

/**
 * @memberof constants
 * @type {Number[]}
 */
export const primes = [
    2, 3, 5, 7, 11, 13, 17,
    19, 23, 29, 31, 37, 41,
    43, 47, 53, 59, 61, 67,
    71, 73, 79, 83, 89, 97
];

/**
 * @memberof constants
 * @type {SecurityK3y[]}
 */
export const l0ckets = [
    "vc2c7q",
    "cmppiq",
    "tvfkyq",
    "uphlaw",
    "6hh8xw",
    "xwz7ja",
    "sa23uw",
    "72umy0"
];

/**
 * @memberof constants
 * @type {String[]}
 */
export const securityLevelNames = [
    "FULLSEC",
    "HIGHSEC",
    "MIDSEC",
    "LOWSEC",
    "NULLSEC"
];

export const configDirectory = path.resolve(__dirname, "../hackmud");
