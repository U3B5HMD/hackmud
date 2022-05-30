import Lock from "../src/lock.js";
import { unlockCommands } from "../src/constants.js";

/**
 * @classdesc Emulates an EZ_35 lock
 * @memberof emulators
 * @extends Lock
 */
class EZ_35 extends Lock {
    /**
     * @param {(Ez35AnswerKey|Object)} [config={}] The lock configuration.
     */
    constructor ({ answerKey = {} } = {}) {
        super({
            answerKey,
            company: "HALPERYON SYSTEMS",
            type: "EZ_35"
        });
    }
    /**
     * Takes in the passed in answers object and returns an answer key that the
     * lock will use when determining if it has been unlocked.
     * @param {(Object|Ez35AnswerKey)} [answers={}] The answers used to unlock the lock.
     *
     * @returns {Ez35AnswerKey} Answer key.
     */
    buildAnswerKey (answers = {}) {
        const {
            EZ_35 = this.getRandomAnswerFromArray(unlockCommands)[0],
            digit = Math.floor(Math.random() * (9 - 0) + 0)
        } = answers;

        return {
            EZ_35,
            digit
        };
    }
    /**
     * Determines if a lock can be unlocked with the passed in answers.
     * @param {(Object|Ez35AnswerKey)} [answers={}] The answers used to unlock the lock.
     *
     * @returns {String|String[]} A "lock unlocked" or "lock error" message.
     */
    unlock (answers = {}) {
        const {
            EZ_35,
            digit
        } = answers;

        if (EZ_35 === undefined) {
            return this.getAccessDeniedMsg();
        }

        if (typeof EZ_35 !== "string") {
            return this.getAnswerIsWrongTypeMsg(EZ_35, "unlock command");
        }

        if (EZ_35 !== this.answerKey.EZ_35) {
            return this.getAnswerIsWrongValueMsg(EZ_35, "unlock command");
        }

        if (digit === undefined) {
            return this.getAnswerIsMissingMsg("digit");
        }

        if (typeof digit !== "number") {
            return this.getAnswerIsWrongTypeMsg(digit, "digit");
        }

        if (digit < 0) {
            return this.getAnswerOutOfRangeMsg(digit, "<", 0);
        }

        if (digit > 9) {
            return this.getAnswerOutOfRangeMsg(digit, ">", 9);
        }

        if (digit !== this.answerKey.digit) {
            return this.getAnswerIsWrongValueMsg(digit, "digit");
        }

        return this.getLockUnlockedMsg();
    }
}

export default EZ_35;
