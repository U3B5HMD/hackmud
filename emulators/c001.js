import Lock from "../src/lock.js";
import { colors } from "../src/constants.js";

/**
 * @classdesc Emulates a C001 lock
 * @memberof emulators
 * @extends Lock
 */
class C001 extends Lock {
    /**
     * @param {(C001AnswerKey|Object)} [config={}] The lock configuration.
     */
    constructor ({ answerKey = {} } = {}) {
        super({
            answerKey,
            company: "CORE",
            type: "c001"
        });
    }

    /**
     * Takes in the passed in answers object and returns an answer key that the
     * lock will use when determining if it has been unlocked.
     * @param {(Object|C001AnswerKey)} [answers={}] The answers used to unlock the lock.
     *
     * @returns {C001AnswerKey} Answer key.
     */
    buildAnswerKey (answers = {}) {
        const {
            c001 = this.getRandomAnswerFromArray(colors)[0]
        } = answers;

        return {
            c001: c001,
            color_digit: c001.length
        };
    }

    /**
     * Determines if a lock can be unlocked with the passed in answers.
     * @param {(Object|C001AnswerKey)} [answers={}] The answers used to unlock the lock.
     *
     * @returns {String|String[]} A "lock unlocked" or "lock error" message.
     */
    unlock (answers = {}) {
        const {
            c001,
            color_digit
        } = answers;

        if (c001 === undefined) {
            return this.getAccessDeniedMsg();
        }

        if (typeof c001 !== "string") {
            return this.getAnswerIsWrongTypeMsg(c001, "string");
        }

        if (c001 !== this.answerKey.c001) {
            return this.getAnswerIsWrongValueMsg(c001, "color name");
        }

        if (color_digit === undefined) {
            return this.getAnswerIsMissingMsg("color_digit");
        }

        if (typeof color_digit !== "number") {
            return this.getAnswerIsWrongTypeMsg(color_digit, "number");
        }

        if (color_digit < 0) {
            return this.getAnswerOutOfRangeMsg(color_digit, "<", 0);
        }

        if (color_digit > 9) {
            return this.getAnswerOutOfRangeMsg(color_digit, ">", 9);
        }

        if (color_digit !== this.answerKey.color_digit) {
            return this.getAnswerIsWrongValueMsg(answers.color_digit, "color digit");
        }

        return this.getLockUnlockedMsg();
    }
}

export default C001;
