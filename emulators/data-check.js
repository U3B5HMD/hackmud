import Lock from "../src/lock.js";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const dataCheck = require("../src/data/data-check.json");

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

    buildAnswerKey (questions = []) {
        let answer = "";
        const fullQuestionList = { ...dataCheck[`tier${this.tier}`] };

        if (questions.length) {
            for (let i = 0; i < questions.length; i++) {
                answer += fullQuestionList[questions[i]];
            }
        } else {
            for (let i = 0; i < 3; i++) {
                const [ question ] = this.getRandomAnswerFromArray(Object.keys(fullQuestionList));
                this.questions.push(question);
                answer += fullQuestionList[fullQuestionList[question]];
                delete fullQuestionList[question];
            }
        }

        return {
            [this.type]: answer
        };
    }

    unlock (answers = {}) {
        const {
            DATA_CHECK
        } = answers;

        if (DATA_CHECK !== this.answerKey.DATA_CHECK) {
            return this.prompt;
        }

        return this.getLockUnlockedMsg();
    }
}
