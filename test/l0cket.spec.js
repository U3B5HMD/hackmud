import { expect } from "chai";
import L0cket from "../emulators/l0cket.js";
import { l0ckets } from "../src/constants.js";

describe("L0cket Lock", () => {
    const lock = new L0cket({
        answerKey: {
            l0cket: "ABCDEFG"
        }
    });

    describe("unlock", () => {
        context("when 'l0cket' is missing", () => {
            it("should return an 'access denied' error", () => {
                expect(lock.unlock({})).to.deep.equal(lock.getAccessDeniedMsg());
            });
        });

        context("when no answers are passed in", () => {
            it("should return an 'access denied' error", () => {
                expect(lock.unlock()).to.deep.equal(lock.getAccessDeniedMsg());
            });
        });

        context("when 'l0cket' not a string", () => {
            const l0cket = 5;

            it("should return a 'wrong type' error", () => {
                expect(lock.unlock({ l0cket: l0cket })).to.deep
                    .equal(lock.getAnswerIsWrongTypeMsg(l0cket, "security k3y"));
            });
        });

        context("When 'l0cket' is not the correct security k3y", () => {
            it("should return a 'wrong value' error", () => {
                const answer = "open";

                expect(lock.unlock({ l0cket: answer })).to.deep
                    .equal(lock.getAnswerIsWrongValueMsg(answer, "security k3y"));
            });
        });

        context("when all <answer> key/value pairs are correct", () => {
            const response = lock.unlock({ l0cket: "ABCDEFG" });

            it("should return a 'lock unlocked' message", () => {
                expect(response).to.deep.equal(lock.getLockUnlockedMsg());
            });

            it("should mark the locked as breached", () => {
                expect(lock.isBreached).to.equal(true);
            });
        });
    });

    describe("buildAnswerKey", () => {
        context("When l0cket is defined in the answer key", () => {
            const result = lock.buildAnswerKey({ l0cket: "123456" });

            it("should use the passed in value", () => {
                expect(result.l0cket).to.equal("123456");
            });
        });

        context("When l0cket is not defined in the answer key", () => {
            const result = lock.buildAnswerKey();

            it("should choose a random color for 'l0cket'", () => {
                expect(result.l0cket).to.be.oneOf(l0ckets);
            });
        });
    });
});
