import { expect } from "chai";
import EZ_35 from "../emulators/ez-35";
import { unlockCommands } from "../src/constants";

describe("EZ_35 Lock", () => {
    const lock = new EZ_35({
        answerKey: {
            EZ_35: "unlock",
            digit: 5
        }
    });

    describe("unlock", () => {
        context("when 'EZ_35' is missing", () => {
            it("should return an 'access denied' error", () => {
                expect(lock.unlock({ digit: 5 })).to.deep
                    .equal(lock.getAccessDeniedMsg());
            });
        });

        context("when called without parameters", () => {
            it("should return an 'access denied' message", () => {
                expect(lock.unlock()).to.deep.equal(lock.getAccessDeniedMsg());
            });
        });

        context("when 'EZ_35' is not a string", () => {
            const command = 5;

            it("should return a 'wrong type' error", () => {
                expect(lock.unlock({ EZ_35: command, digit: 5 })).to.deep
                    .equal(lock.getAnswerIsWrongTypeMsg(command, "unlock command"));
            });
        });

        context("when 'EZ_35' the wrong unlock command", () => {
            const command = "open";

            it("should return a 'wrong value' error", () => {
                expect(lock.unlock({ EZ_35: command, digit: 5 })).to.deep
                    .equal(lock.getAnswerIsWrongValueMsg(command, "unlock command"));
            });
        });

        context("when 'digit' is missing", () => {
            it("should return a 'parameter missing' error", () => {
                expect(lock.unlock({ EZ_35: "unlock" }))
                    .to.deep.equal(lock.getAnswerIsMissingMsg("digit"));
            });
        });

        context("when 'digit' not a number", () => {
            it("should return a lock error", () => {
                const digit = "test";

                expect(lock.unlock({ EZ_35: "unlock", digit }))
                    .to.deep.equal(lock.getAnswerIsWrongTypeMsg(digit, "digit"));
            });
        });

        context("when 'digit' is < 0", () => {
            it("should return an 'out of range (too small)' error", () => {
                const digit = -5;

                expect(lock.unlock({ EZ_35: "unlock", digit }))
                    .to.deep.equal(lock.getAnswerOutOfRangeMsg(digit, "<", 0));
            });
        });

        context("when 'digit' is > 9", () => {
            it("should return an 'out of range (too big)' error", () => {
                const digit = 10;

                expect(lock.unlock({ EZ_35: "unlock", digit })).to.deep
                    .equal(lock.getAnswerOutOfRangeMsg(digit, ">", 9));
            });
        });

        context("When 'digit' is the wrong number", () => {
            it("should return a 'wrong value' error", () => {
                const digit = 7;

                expect(lock.unlock({ EZ_35: "unlock", digit })).to.deep
                    .equal(lock.getAnswerIsWrongValueMsg(digit, "digit"));
            });
        });

        context("when all <answer> key/value pairs are correct", () => {
            it("should return a 'lock unlocked' message", () => {
                expect(lock.unlock({ EZ_35: "unlock", digit: 5 })).to.deep
                    .equal(lock.getLockUnlockedMsg());
            });
        });
    });

    describe("buildAnswerKey", () => {
        context("When EZ_35 is defined in the answer key", () => {
            const result = lock.buildAnswerKey({ EZ_35: "unlock" });

            it("should use the passed in value", () => {
                expect(result.EZ_35).to.equal("unlock");
            });
        });

        context("When EZ_35 is not defined in the answer key", () => {
            const result = lock.buildAnswerKey();

            it("should choose a random color for 'EZ_35'", () => {
                expect(result.EZ_35).to.be.oneOf(unlockCommands);
            });
        });

        context("When digit is defined in the answer key", () => {
            const result = lock.buildAnswerKey({ EZ_35: "unlock", digit: 5 });

            it("should use the passed in value", () => {
                expect(result.digit).to.equal(5);
            });
        });

        context("When digit is not defined in the answer key", () => {
            const result = lock.buildAnswerKey({ EZ_35: "unlock" });

            it("should choose a digit between 0 and 9", () => {
                expect(result.digit).to.be.at.least(0);
                expect(result.digit).to.be.at.most(9);
            });
        });
    });
});