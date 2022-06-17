import { expect } from "chai";
import C001 from "../emulators/c001.js";
import { colors } from "../src/constants.js";

describe("C001 Lock", () => {
    const lock = new C001({
        answerKey: {
            c001: "red",
            color_digit: 3
        }
    });

    describe("unlock", () => {
        context("when 'c001' is missing", () => {
            it("should return an 'access denied' error", () => {
                expect(lock.unlock({ color_digit: 3 }))
                    .to.deep.equal(lock.getAccessDeniedMsg());
            });
        });

        context("when no answers are passed in", () => {
            it("should return an 'access denied' error", () => {
                expect(lock.unlock()).to.deep.equal(lock.getAccessDeniedMsg());
            });
        });

        context("when 'c001' is not a string", () => {
            const color = 5;

            it("should return a 'wrong type' error", () => {
                expect(lock.unlock({ c001: color, color_digit: 3 }))
                    .to.deep.equal(
                        lock.getAnswerIsWrongTypeMsg(color, "string")
                    );
            });
        });

        context("When 'c001' is not the correct color", () => {
            it("should return an 'wrong value' error", () => {
                const color = "green";

                expect(lock.unlock({ c001: color, color_digit: 3 }))
                    .to.deep.equal(
                        lock.getAnswerIsWrongValueMsg(color, "color name")
                    );
            });
        });

        context("when color_digit is missing", () => {
            it("should return a 'wrong type' error", () => {
                expect(lock.unlock({ c001: "red" })).to
                    .deep.equal(lock.getAnswerIsMissingMsg("color_digit"));
            });
        });

        context("when 'color_digit' is not a number", () => {
            it("should return a 'wrong type' error", () => {
                const colorDigit = "test";

                expect(lock.unlock({ c001: "red", color_digit: colorDigit }))
                    .to.deep.equal(
                        lock.getAnswerIsWrongTypeMsg(colorDigit, "number")
                    );
            });
        });

        context("when 'color_digit' is < 0", () => {
            it("should return an 'out of range (too small)' error", () => {
                const colorDigit = -5;

                expect(lock.unlock({ c001: "red", color_digit: colorDigit }))
                    .to.deep.equal(
                        lock.getAnswerOutOfRangeMsg(colorDigit, "<", 0)
                    );
            });
        });

        context("when 'color_digit' is > 9", () => {
            it("should return an 'out of range (too big)' error", () => {
                const colorDigit = 10;

                expect(lock.unlock({ c001: "red", color_digit: colorDigit })).to
                    .deep.equal(lock.getAnswerOutOfRangeMsg(colorDigit, ">", 9));
            });
        });

        context("When 'color_digit' is not the correct number", () => {
            it("should return a 'wrong value' error", () => {
                const colorDigit = 5;

                expect(lock.unlock({ c001: "red", color_digit: colorDigit })).to
                    .deep.equal(lock.getAnswerIsWrongValueMsg(
                        colorDigit,
                        "color digit"
                    ));
            });
        });

        context("when all <answer> key/value pairs are correct", () => {
            const response = lock.unlock({ c001: "red", color_digit: 3 });

            it("should return a 'lock unlocked' message", () => {
                expect(response).to.equal(lock.getLockUnlockedMsg());
            });

            it("should mark the locked as breached", () => {
                expect(lock.isBreached).to.equal(true);
            });
        });
    });

    describe("buildAnswerKey", () => {
        context("When c001 is defined in the answer key", () => {
            const result = lock.buildAnswerKey({ c001: "green" });

            it("should use the passed in value", () => {
                expect(result.c001).to.equal("green");
            });

            it("should set 'color_digit' to the length of 'c001'", () => {
                expect(result.color_digit).to.equal(5);
            });
        });

        context("When c001 is not defined in the answer key", () => {
            const result = lock.buildAnswerKey();

            it("should choose a random color for 'c001'", () => {
                expect(result.c001).to.be.oneOf(colors);
            });

            it("should set 'color_digit' to the length of 'c001'", () => {
                expect(result.color_digit).to.equal(result.c001.length);
            });
        });
    });
});
