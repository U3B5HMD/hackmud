import Lock from "../src/lock.js";
import { unlockCommands } from "../src/constants.js";

/**
 * @classdesc Emulates an EZ_21 lock
 * @memberof emulators
 * @extends Lock
 */
class EZ_21 extends Lock {
    /**
     * @param {(Ez21AnswerKey|Object)} [config={}] The lock configuration.
     */
    constructor ({ answerKey = {} } = {}) {
        super({
            answerKey,
            company: "HALPERYON SYSTEMS",
            type: "EZ_21"
        });
    }
    /**
     * Takes in the passed in answers object and returns an answer key that the
     * lock will use when determining if it has been unlocked.
     * @param {(Object|Ez21AnswerKey)} [answers={}] The answers used to unlock the lock.
     *
     * @returns {Ez21AnswerKey} Answer key.
     */
    buildAnswerKey (answers = {}) {
        // TODO: Write tests
        const {
            EZ_21 = this.getRandomAnswerFromArray(unlockCommands)[0]
        } = answers;

        return {
            EZ_21
        };
    }
    /**
     * Determines if a lock can be unlocked with the passed in answers.
     * @param {(Object|Ez21AnswerKey)} [answers={}] The answers used to unlock the lock.
     *
     * @returns {String|String[]} A "lock unlocked" or "lock error" message.
     */
    unlock (answers = {}) {

        const {
            EZ_21
        } = answers;

        if (EZ_21 === undefined) {
            return this.getAccessDeniedMsg();
        }

        if (typeof EZ_21 !== "string") {
            return this.getAnswerIsWrongTypeMsg(EZ_21, "unlock command");
        }

        if (EZ_21 !== this.answerKey.EZ_21) {
            return this.getAnswerIsWrongValueMsg(EZ_21, "unlock command");
        }

        return this.getLockUnlockedMsg();

    }
}

export default EZ_21;