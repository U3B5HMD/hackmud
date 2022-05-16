import Lock from "../src/lock";
import { l0ckets } from "../src/constants";

/**
 * @classdesc Emulates a L0cket lock
 * @memberof emulators
 * @extends Lock
 */
class L0cket extends Lock {
    /**
     * @param {(L0cketAnswerKey|Object)} [config={}] The lock configuration.
     */
    constructor ({ answerKey = {} } = {}) {
        super({
            answerKey,
            company: "NUUTEC",
            type: "l0cket"
        });
    }
    /**
     * Takes in the passed in answers object and returns an answer key that the
     * lock will use when determining if it has been unlocked.
     * @param {(Object|L0cketAnswerKey)} [answers={}] The answers used to unlock the lock.
     *
     * @returns {L0cketAnswerKey} Answer key.
     */
    buildAnswerKey (answers = {}) {
        // TODO: Write tests
        const {
            l0cket = this.getRandomAnswerFromArray(l0ckets)[0]
        } = answers;

        return {
            l0cket
        };
    }
    /**
     * Determines if a lock can be unlocked with the passed in answers.
     * @param {(Object|L0cketAnswerKey)} [answers={}] The answers used to unlock the lock.
     *
     * @returns {String|String[]} A "lock unlocked" or "lock error" message.
     */
    unlock (answers = {}) {
        const {
            l0cket
        } = answers;

        if (l0cket === undefined) {
            return this.getAccessDeniedMsg();
        }

        if (typeof l0cket !== "string") {
            return this.getAnswerIsWrongTypeMsg(l0cket, "security k3y");
        }

        if (l0cket !== this.answerKey.l0cket) {
            return this.getAnswerIsWrongValueMsg(l0cket, "security k3y");
        }

        return this.getLockUnlockedMsg();

    }
}

export default L0cket;