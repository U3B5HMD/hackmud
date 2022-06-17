/**
 * @classdesc Emulates a non-descript lock.
 * @abstract
 * @property {String} LOCK_ERROR  Message that gets output when a lock throws an error.
 * @property {String} LOCK_UNLOCKED  Message that gets output when a lock is unlocked.
 * @property {String} MSG_LINE_SEPERATOR  Separator character for dividing lock messages.
 */
class Lock {
    /**
     * @constructor
     * @param {Object} configuration Configuration options for the lock.
     * @param {String} configuration.type The type of lock.
     * @param {String} [configuration.company] The name of lock company.
     * @param {Object} [configuration.answerKey] Answers used to unlock the lock.
     */
    constructor (configuration) {
        const {
            type,
            company
        } = configuration;

        this.type = type;
        this.company = company;
        this.isBreached = false;
    }
    /**
     * @static
     * @constant
     */
    static LOCK_UNLOCKED = "LOCK_UNLOCKED";
    /**
     * @static
     * @constant
     */
    static LOCK_ERROR = "LOCK_ERROR";
    /**
     * @static
     * @constant
     */
    static MSG_LINE_SEPERATOR = "\n";
    /**
     * Takes in the passed in answers object and returns an answer key that the
     * lock will use when determining if it has been unlocked.
     * @abstract
     *
     * @param {Object} answers The answers to use for the answer key.
     *
     * @returns {Object} An answer key.
     */
    buildAnswerKey (answers = {}) {
        return answers;
    }
    /**
     * Takes in a message and returns an error message.
     * @abstract
     *
     * @param {String} msg The error message.
     *
     * @returns {Array} An array consisting of a LOCK_ERROR message and the passed in message.
     */
    buildErrorMsg = msg => {
        // TODO: write tests
        return [
            Lock.LOCK_ERROR,
            msg
        ];
    };
    /**
     * Checks to see if the passed in answer key is empty.
     * @param {Object} answerKey The answer key to check.
     *
     * @returns {Boolean} true/false
     */
    isAnswerKeyEmpty (answerKey) {
        return (
            typeof answerKey !== "object"
             || Object.keys(answerKey).length === 0
        );
    }
    /**
     * Returns a random answer from a passed in array of answers.
     * @param {Array} array An array of answers.
     *
     * @returns {Array<any, number>} answer A random value from the array.
     */
    getRandomAnswerFromArray (array) {
        // TODO: Write tests
        const index = Math.floor(Math.random() * array.length);
        return [ array[index], index ];
    }
    /**
     * Returns the passed in value wrapped in double quotes if it is a string.
     * @param {*} value - The value to wrap in quotes
     *
     * @returns {String|any} result The value or the value wrapped in quotes.
     */
    quoteIfString (value) {
        return typeof value === "string" ? `"${value}"` : value;
    }
    /**
     * Returns an "access denied" message.
     *
     * @returns {String[]} Message.
     */
    getAccessDeniedMsg () {
        return this.buildErrorMsg(
            `Denied access by ${this.company} \`N${this.type}\` lock.`
        );
    }
    /**
     * Returns a "wrong answer" message.
     * @param {*} answer The answer that is incorrect.
     * @param {String} answerDescription The description of that answer.
     *
     * @returns {String[]} Message.
     */
    getAnswerIsWrongValueMsg (answer, answerDescription) {
        return this.buildErrorMsg(
            `\`V"${answer}"\` is not the correct ${answerDescription}.`
        );
    }
    /**
     * Returns a "parameter missing" message.
     * @param {String} parameter The name of the parameter that's missing.
     *
     * @returns {String[]} Message.
     */
    getAnswerIsMissingMsg (parameter) {
        return this.buildErrorMsg(
            `Required unlock parameter \`N${parameter}\` is missing.`
        );
    }
    /**
     * Returns a "wrong type" message.
     * @param {*} answer The answer that is the wrong type.
     * @param {String} type The type that the answer should be.
     *
     * @returns {String[]} Message.
     */
    getAnswerIsWrongTypeMsg (answer, type) {
        return this.buildErrorMsg(
            `\`N${this.quoteIfString(answer)}\` is not a ${type}.`
        );
    }
    /**
     * Returns an "out of range" message.
     * @param {Number} answer The answer that is out of range.
     * @param {String} operator The comparison operator used against the limit.
     * @param {Number} limit The limit that the answer is out of range of.
     *
     * @throws If operator is not '>' or '<'.
     * @throws If answer is not a number.
     * @throws If limit is not a number.
     *
     * @returns {String[]} Message.
     */
    getAnswerOutOfRangeMsg (answer, operator, limit) {
        let msg = null;

        if (isNaN(answer)) {
            throw `"${answer}" is not a number.`;
        }

        if (isNaN(limit)) {
            throw `"${limit}" is not a number.`;
        }

        if (operator === ">") {
            msg = `\`V${answer}\` is too big. Correct value is below ${limit}.`;
        } else if (operator === "<") {
            msg = `\`V${answer}\` is not above ${limit - 1}.`;
        } else {
            throw new Error("Invalid operator: expected '>' or '<'.");
        }

        return this.buildErrorMsg(msg);
    }

    /**
     * Returns a "lock unlocked" message.
     * @returns {string} Message.
     */
    getLockUnlockedMsg () {
        return `${Lock.LOCK_UNLOCKED} ${this.type}.`;
    }

    /**
     * When called from an inheriting class, determines if the lock can be
     * unlocked with the passed in answers.
     * @abstract
     *
     * @throws If called directly from the Lock class.
     *
     * @returns {String|String[]} A "lock unlocked" or "lock error" message.
     */
    unlock () {
        throw new Error("Method must be implemented by inheriting class.");
    }

    rotate () {
        this.isBreached = false;
        this.buildAnswerKey();
    }
}

export default Lock;
