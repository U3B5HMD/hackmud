import { expect } from "chai";
import EZ_21 from "../emulators/ez-21.js";
import { unlockCommands } from "../src/constants.js";

describe("EZ_21 Lock", () => {
    const lock = new EZ_21({
        answerKey: {
            EZ_21: "unlock"
        }
    });

    describe("unlock", () => {
        context("when 'EZ_21' is missing", () => {
            it("should return an 'access denied' message", () => {
                expect(lock.unlock({})).to.deep.equal(lock.getAccessDeniedMsg());
            });
        });

        context("when called without parameters", () => {
            it("should return an 'access denied' message", () => {
                expect(lock.unlock()).to.deep.equal(lock.getAccessDeniedMsg());
            });
        });

        context("when 'EZ_21' not a string", () => {
            const command = 5;

            it("should return a 'wrong type' message", () => {
                expect(lock.unlock({ EZ_21: command })).to.deep
                    .equal(lock.getAnswerIsWrongTypeMsg(command, "unlock command"));
            });
        });

        context("When 'EZ_21' the wrong unlock command", () => {
            it("should return a 'wrong value' error", () => {
                const answer = "open";

                expect(lock.unlock({ EZ_21: answer })).to.deep
                    .equal(lock.getAnswerIsWrongValueMsg(answer, "unlock command"));
            });
        });

        context("when all <answer> key/value pairs are correct", () => {
            it("should return a 'lock unlocked' message", () => {
                expect(lock.unlock({ EZ_21: "unlock" })).to.deep
                    .equal(lock.getLockUnlockedMsg());
            });
        });
    });

    describe("buildAnswerKey", () => {
        context("When EZ_21 is defined in the answer key", () => {
            const result = lock.buildAnswerKey({ EZ_21: "unlock" });

            it("should use the passed in value", () => {
                expect(result.EZ_21).to.equal("unlock");
            });
        });

        context("When EZ_21 is not defined in the answer key", () => {
            const result = lock.buildAnswerKey();

            it("should choose a random unlock command for 'EZ_21'", () => {
                expect(result.EZ_21).to.be.oneOf(unlockCommands);
            });
        });
    });

});
