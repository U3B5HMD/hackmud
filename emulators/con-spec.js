import Lock from "../src/lock.js";
import { conspecPatterns } from "../src/constants.js";

/**
 * @classdesc Emulates a CON_SPEC lock
 * @memberof emulators
 * @extends Lock
 */
export default class DATA_CHECK extends Lock {
    /**
     * @param {String} [config={}] Lock configuration options.
     * @param {String} [config.pattern] The letter pattern to use.
     * @param {String} [config.startIndex] The starting index of sequence.
     * @param {String} [config.sequenceLength] The number of letters to show in the sequence.
     */
    constructor (config) {
        super({
            type: "CON_SPEC"
        });

        this.answerKey = this.buildAnswerKey(config);
    }
    /**
     * Takes in the passed in answer and returns an answer key that the
     * lock will use when determining if it has been unlocked.
     * @param {Object} [config={}}] The answer used to unlock the lock.
     *
     * @returns {Ez35AnswerKey} Answer key.
     */
    buildAnswerKey (config = {}) {
        let pattern = config.pattern;
        let startIndex = config.startIndex;
        let sequenceLength = config.sequenceLength;
        let maxSequenceLength = 5;

        if (!pattern) {
            [ pattern ] = this.getRandomAnswerFromArray(conspecPatterns);
        }

        pattern = pattern.split("");

        if (isNaN(sequenceLength)) {
            sequenceLength = maxSequenceLength;
        } else {
            sequenceLength = Math.min(sequenceLength, maxSequenceLength);
        }

        const maxStartIndex = pattern.length - 1 - (3 + sequenceLength);

        if (isNaN(startIndex) || startIndex < 0) {
            startIndex = Math.floor(
                Math.random() * (maxStartIndex - 0 + 1) + 0
            );
        }

        const endIndex = startIndex + sequenceLength;

        this.pattern = pattern.slice(startIndex, endIndex).join("");
        const CON_SPEC = pattern.slice(endIndex, endIndex + 3).join("");

        this.prompt = [
            this.pattern,
            "Provide the next three letters in the sequence"
        ].join("\n");

        return {
            [this.type]: CON_SPEC
        };
    }

    unlock (answers = {}) {
        const {
            CON_SPEC
        } = answers;

        if (CON_SPEC === undefined) {
            return this.getAccessDeniedMsg();
        }

        if (CON_SPEC !== this.answerKey.CON_SPEC) {
            return this.prompt;
        }

        this.isBreached = true;
        return this.getLockUnlockedMsg();
    }
}
