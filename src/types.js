/**
 * @namespace emulators
 */

/**
 * @namespace constants
 */

/**
 * A Hackmud color.
 * @typedef {("red"|"orange"|"yellow"|"lime"|"green"|"cyan"|"blue"|"purple")} Color
 */

/**
 * An EZ Lock Unlock command.
 * @typedef {("unlock"|"release"|"open")} UnlockCommand
 */

/**
 * A Security K3y
 * @typedef {("vc2c7q" | "cmppiq" | "tvfkyq" | "uphlaw" | "6hh8xw" | "xwz7ja" | "sa23uw" | "72umy0")} SecurityK3y
 */

/**
 * A C001 answer key.
 * @typedef {Object} C001AnswerKey
 * @property {Color} c001 The color used to unlock the lock.
 * @property {Number} color_digit The number of characters in c001.
 */

/**
 * A C002 answer key.
 * @typedef {Object} C002AnswerKey
 * @property {Color} c002 The color used to unlock the lock.
 * @property {String} c002_complement The complementary color used to unlock the lock.
 */

/**
 * A C003 answer key.
 * @typedef {Object} C003AnswerKey
 * @property {Color} c003 The color used to unlock the lock.
 * @property {String} c003_triad_1 The first complementary color used to unlock the lock.
 * @property {String} c003_triad_2 The first complementary color used to unlock the lock.
 */

/**
 * An EZ_21 answer key.
 * @typedef {Object} Ez21AnswerKey
 * @property {UnlockCommand} EZ_21 The command used to unlock the lock.
 */

/**
 * An EZ_35 answer key.
 * @typedef {Object} Ez35AnswerKey
 * @property {UnlockCommand} EZ_35 The command used to unlock the lock.
 * @property {number} digit The color used to unlock the lock.
 */

/**
 * An EZ_40 answer key.
 * @typedef {Object} Ez40AnswerKey
 * @property {UnlockCommand} EZ_40 The command used to unlock the lock.
 * @property {number} ez_prime The prime number used to unlock the lock.
 */

/**
 * An L0cket answer key.
 * @typedef {Object} L0cketAnswerKey
 * @property {SecurityK3y} l0cket The command used to unlock the lock.
 */
