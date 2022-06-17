import Lock from "../src/lock.js";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const dataCheck = require("../src/data/data-check.json");

/**
 * @classdesc Emulates a DATA_CHECK lock
 * @memberof emulators
 * @extends Lock
 */
export default class DATA_CHECK extends Lock {
    constructor ({ tier = 1, questions = [] } = {}) {
        super({
            type: "DATA_CHECK"
        });

        this.tier = tier;
        this.prompt = "";
        this.questions = [];

        this.answerKey = this.buildAnswerKey(questions);
    }
    /**
     * Takes in the passed in array of questions and returns an answer key that
     * the lock will use when determining if it has been unlocked. If no answers
     * are passed in, random questions are chosen based on the lock's tier.
     * @param {String[]} [questions=[]] The questions used generate the answer.
     *
     * @returns {Object} Answer key.
     */
    buildAnswerKey (questions = []) {
        let answer = "";
        const fullQuestionList = { ...dataCheck[`tier${this.tier}`] };

        if (questions.length) {
            for (let i = 0; i < questions.length; i++) {
                answer += fullQuestionList[questions[i]];
            }
        } else {
            for (let i = 0; i < 3; i++) {
                const [ question ] = this.getRandomAnswerFromArray(
                    Object.keys(fullQuestionList)
                );

                this.questions.push(question);

                answer += fullQuestionList[fullQuestionList[question]];

                // prevent duplicate questions from being chosen
                delete fullQuestionList[question];
            }
        }

        this.prompt = this.questions.join("\n");

        return {
            [this.type]: answer
        };
    }

    unlock (answers = {}) {
        const {
            DATA_CHECK
        } = answers;

        if (DATA_CHECK === undefined) {
            return this.getAccessDeniedMsg();
        }

        if (DATA_CHECK !== this.answerKey.DATA_CHECK) {
            return this.prompt;
        }

        this.isBreached = true;
        return this.getLockUnlockedMsg();
    }
}
