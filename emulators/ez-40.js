import Lock from "../src/lock.js";
import { unlockCommands, primes } from "../src/constants.js";

/**
 * @classdesc Emulates an EZ_40 lock
 * @memberof emulators
 * @extends Lock
 */
class EZ_40 extends Lock {
    /**
     * @param {(Ez40AnswerKey|Object)} [config={}] The lock configuration.
     */
    constructor ({ answerKey = {} } = {}) {
        super({
            answerKey,
            company: "HALPERYON SYSTEMS",
            type: "EZ_40"
        });
    }
    /**
     * Takes in the passed in answers object and returns an answer key that the
     * lock will use when determining if it has been unlocked.
     * @param {(Object|Ez40AnswerKey)} [answers={}] The answers used to unlock the lock.
     *
     * @returns {Ez40AnswerKey} Answer key.
     */
    buildAnswerKey (answers = {}) {
        const {
            EZ_40 = this.getRandomAnswerFromArray(unlockCommands)[0],
            ez_prime = this.getRandomAnswerFromArray(primes)[0]
        } = answers;

        return {
            EZ_40,
            ez_prime
        };
    }
    /**
     * Determines if a lock can be unlocked with the passed in answers.
     * @param {(Object|Ez40AnswerKey)} [answers={}] The answers used to unlock the lock.
     *
     * @returns {String|String[]} A "lock unlocked" or "lock error" message.
     */
    unlock (answers = {}) {
        const {
            EZ_40,
            ez_prime
        } = answers;

        if (EZ_40 === undefined) {
            return this.getAccessDeniedMsg();
        }

        if (typeof EZ_40 !== "string") {
            return this.getAnswerIsWrongTypeMsg(EZ_40, "unlock command");
        }

        if (EZ_40 !== this.answerKey.EZ_40) {
            return this.getAnswerIsWrongValueMsg(EZ_40, "unlock command");
        }

        if (ez_prime === undefined) {
            return this.getAnswerIsMissingMsg("ez_prime");
        }

        if (typeof ez_prime !== "number") {
            return this.getAnswerIsWrongTypeMsg(ez_prime, "prime");
        }

        if (ez_prime < 1) {
            return this.getAnswerOutOfRangeMsg(ez_prime, "<", 1);
        }

        if (ez_prime > 100) {
            return this.getAnswerOutOfRangeMsg(ez_prime, ">", 100);
        }

        if (ez_prime !== this.answerKey.ez_prime) {
            return this.getAnswerIsWrongValueMsg(ez_prime, "prime");
        }

        return this.getLockUnlockedMsg();
    }
}

export default EZ_40;