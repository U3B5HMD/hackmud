import { expect } from "chai";
import DATA_CHECK from "../emulators/data-check.js";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const dataCheck = require("../src/data/data-check.json");

describe("DATA_CHECK Lock", () => {
    const lock = new DATA_CHECK({
        questions: [
            "users gather in channel CAFE to share ++++++",
            "this fact checking process is a function of ++++++, the monitor",
            "in trust's vLAN, you visited faythe's ++++++"
        ]
    });

    describe("unlock", () => {
        context("when 'DATA_CHECK' is missing", () => {
            it("should return the list of three questions", () => {
                expect(lock.unlock({})).to.deep.equal(lock.questions.join("\n"));
            });
        });

        context("when called without parameters", () => {
            it("should return the list of three questions", () => {
                expect(lock.unlock()).to.deep.equal(lock.questions.join("\n"));
            });
        });

        context("when 'DATA_CHECK' not a string", () => {
            const answer = 5;

            it("should return the list of three questions", () => {
                expect(lock.unlock({ DATA_CHECK: answer })).to.deep
                    .equal(lock.questions.join("\n"));
            });
        });

        context("When 'DATA_CHECK' is the wrong answer", () => {
            const answer = "wronganswer";

            it("should return the list of three questions", () => {
                expect(lock.unlock({ DATA_CHECK: answer })).to.deep
                    .equal(lock.prompt);
            });
        });

        context("when all <answer> key/value pairs are correct", () => {
            it("should return a 'lock unlocked' message", () => {
                expect(lock.unlock({ DATA_CHECK: "poetryevefountain" })).to.deep
                    .equal(lock.getLockUnlockedMsg());
            });
        });
    });

    describe("buildAnswerKey", () => {
        context("When questions are passed in to the constructor", () => {
            const result = lock.buildAnswerKey([
                "users gather in channel CAFE to share ++++++",
                "this fact checking process is a function of ++++++, the monitor",
                "in trust's vLAN, you visited faythe's ++++++"
            ]);

            it("should use the passed in questions to build the answer", () => {
                expect(result.DATA_CHECK).to.equal("poetryevefountain");
            });
        });

        context("When questions are passed in to the constructor", () => {
            lock.buildAnswerKey();
            const questionList = Object.keys(dataCheck[`tier${lock.tier}`]);

            it("should choose a random set of 3 questions to build the answer from", () => {
                expect(lock.questions.every(
                    question => questionList.includes(question)
                )).to.equal(true);
            });
        });
    });
});
