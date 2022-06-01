import Lock from "../src/lock.js";
import { colors } from "../src/constants.js";

/**
 * @classdesc Emulates a C003 lock
 * @memberof emulators
 * @extends Lock
 */
class C003 extends Lock {
    /**
     * @param {(C003AnswerKey|Object)} [config={}] The lock configuration.
     */
    constructor ({ answerKey = {} } = {}) {
        super({
            answerKey,
            company: "CORE",
            type: "c003"
        });

        this.answerKey = this.buildAnswerKey(answerKey);
    }
    /**
     * Takes in the passed in answers object and returns an answer key that the
     * lock will use when determining if it has been unlocked.
     * @param {(Object|C003AnswerKey)} [answers={}] The answers used to unlock the lock.
     *
     * @returns {C003AnswerKey} Answer key.
     */
    buildAnswerKey (answers = {}) {
        const [ color ] = this.getRandomAnswerFromArray(colors);
        const {
            c003 = color
        } = answers;

        const colorIndex = colors.indexOf(c003);

        return {
            c003: c003,
            c003_triad_1: colors[(colorIndex + 5) % 8],
            c003_triad_2: colors[(colorIndex + 3) % 8]
        };
    }
    /**
     * Determines if a lock can be unlocked with the passed in answers.
     * @param {(Object|C003AnswerKey)} [answers={}] The answers used to unlock the lock.
     *
     * @returns {String|String[]} A "lock unlocked" or "lock error" message.
     */
    unlock (answers = {}) {
        const {
            c003,
            c003_triad_1,
            c003_triad_2
        } = answers;

        if (c003 === undefined) {
            return this.getAccessDeniedMsg();
        }

        if (typeof c003 !== "string") {
            return this.getAnswerIsWrongTypeMsg(c003, "string");
        }

        if (c003 !== this.answerKey.c003) {
            return this.getAnswerIsWrongValueMsg(c003, "color name");
        }

        if (c003_triad_1 === undefined) {
            return this.getAnswerIsMissingMsg("c003_triad_1");
        }

        if (typeof c003_triad_1 !== "string") {
            return this.getAnswerIsWrongTypeMsg(c003_triad_1, "string");
        }

        if (c003_triad_1 !== this.answerKey.c003_triad_1) {
            return this.getAnswerIsWrongValueMsg(
                c003_triad_1,
                "first triad color"
            );
        }

        if (c003_triad_2 === undefined) {
            return this.getAnswerIsMissingMsg("c003_triad_2");
        }

        if (typeof c003_triad_2 !== "string") {
            return this.getAnswerIsWrongTypeMsg(c003_triad_2, "string");
        }

        if (c003_triad_2 !== this.answerKey.c003_triad_2) {
            return this.getAnswerIsWrongValueMsg(
                c003_triad_2,
                "second triad color"
            );
        }

        return this.getLockUnlockedMsg();
    }
}

export default C003;
