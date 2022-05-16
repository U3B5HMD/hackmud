import Lock from "../src/lock";
import { colors } from "../src/constants";

/**
 * @classdesc Emulates a C002 lock
 * @memberof emulators
 * @extends Lock
 */
class C002 extends Lock {
    /**
     * @param {(C002AnswerKey|Object)} [config={}] The lock configuration.
     */
    constructor ({ answerKey = {} } = {}) {
        super({
            answerKey,
            company: "CORE",
            type: "c002"
        });
    }
    /**
     * Takes in the passed in answers object and returns an answer key that the
     * lock will use when determining if it has been unlocked.
     * @param {Object|C001AnswerKey} [answers={}] The answers used to unlock the lock.
     *
     * @returns {C002AnswerKey} Answer key.
     */
    buildAnswerKey (answers = {}) {
        const [ color ] = this.getRandomAnswerFromArray(colors);
        const {
            c002 = color
        } = answers;

        const colorIndex = colors.indexOf(c002);
        const complementaryColor = colors[(colorIndex + 4) % 8];

        return {
            c002: c002,
            c002_complement: complementaryColor
        };
    }
    /**
     * Determines if a lock can be unlocked with the passed in answers.
     * @param {(Object|C002AnswerKey)} [answers={}] The answers used to unlock the lock.
     *
     * @returns {String|String[]} A "lock unlocked" or "lock error" message.
     */
    unlock (answers = {}) {
        const {
            c002,
            c002_complement
        } = answers;

        if (c002 == undefined) {
            return this.getAccessDeniedMsg();
        }

        if (typeof c002 !== "string") {
            return this.getAnswerIsWrongTypeMsg(c002, "string");
        }

        if (c002 !== this.answerKey.c002) {
            return this.getAnswerIsWrongValueMsg(c002, "color name");
        }

        if (c002_complement === undefined) {
            return this.getAnswerIsMissingMsg("c002_complement");
        }

        if (typeof c002_complement !== "string") {
            return this.getAnswerIsWrongTypeMsg(c002_complement, "string");
        }

        if (c002_complement !== this.answerKey.c002_complement) {
            return this.getAnswerIsWrongValueMsg(
                c002_complement,
                "complement color"
            );
        }

        return this.getLockUnlockedMsg();
    }
}

export default C002;