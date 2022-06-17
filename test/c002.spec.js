import { expect } from "chai";
import C002 from "../emulators/c002.js";
import { colors } from "../src/constants.js";

describe("C002 Lock", () => {
    const lock = new C002({
        answerKey: {
            c002: "red"
        }
    });

    describe("unlock", () => {
        context("when 'c002' is missing", () => {
            it("should return an 'access denied' error", () => {
                expect(lock.unlock({ c002_complement: "green" })).to
                    .deep.equal(lock.getAccessDeniedMsg());
            });
        });

        context("when no answers are passed in", () => {
            it("should return an 'access denied' error", () => {
                expect(lock.unlock()).to.deep.equal(lock.getAccessDeniedMsg());
            });
        });

        context("when 'c002' is not a color", () => {
            const color = 5;

            it("should return a 'wrong type' error", () => {
                expect(lock.unlock({ c002: color, c002_complement: "green" }))
                    .to.deep.equal(
                        lock.getAnswerIsWrongTypeMsg(color, "string")
                    );
            });
        });

        context("when 'c002' is not the correct color", () => {
            const color = "pink";

            it("should return a 'wrong value' error", () => {
                expect(lock.unlock({ c002: color, c002_complement: "green" }))
                    .to.deep.equal(
                        lock.getAnswerIsWrongValueMsg(color, "color name")
                    );
            });
        });

        context("when 'c002_complement' is missing", () => {
            it("should return a 'parameter missing' error", () => {
                expect(lock.unlock({ c002: "red" })).to
                    .deep.equal(lock.getAnswerIsMissingMsg("c002_complement"));
            });
        });

        context("when 'c002_complement' not a color", () => {
            const color = 5;
            it("should return a 'wrong value' error", () => {
                expect(lock.unlock({ c002: "red", c002_complement: color })).to
                    .deep.equal(lock.getAnswerIsWrongTypeMsg(color, "string"));
            });
        });

        context("when 'c002_complement' is not the correct color", () => {
            const color = "pink";

            it("should return a 'wrong value' error", () => {
                expect(lock.unlock({ c002: "red", c002_complement: color })).to
                    .deep.equal(lock.getAnswerIsWrongValueMsg(
                        color,
                        "complement color"
                    ));
            });
        });

        context("when all <answer> key/value pairs are correct", () => {
            const response = lock.unlock({
                c002: "red",
                c002_complement: "green"
            });

            it("should return a 'lock unlocked' message", () => {
                expect(response).to.equal(lock.getLockUnlockedMsg());
            });

            it("should mark the locked as breached", () => {
                expect(lock.isBreached).to.equal(true);
            });
        });
    });

    describe("buildAnswerKey", () => {
        context("When c002 is defined in the answer key", () => {
            const result = lock.buildAnswerKey({ c002: "red" });

            it("should use the passed in value", () => {
                expect(result.c002).to.equal("red");
            });

            it("should set 'complementary_color' based off of 'c002'", () => {
                expect(result.c002_complement).to.equal("green");
            });
        });

        context("When c002 is not defined in the answer key", () => {
            const result = lock.buildAnswerKey();

            it("should choose a random color for 'c002'", () => {
                expect(result.c002).to.be.oneOf(colors);
            });

            it("should set 'color_digit' to the length of 'c002'", () => {
                const colorIndex = colors.indexOf(result.c002);

                expect(result.c002_complement).to.equal(
                    colors[(colorIndex + 4) % 8]
                );
            });
        });
    });
});
