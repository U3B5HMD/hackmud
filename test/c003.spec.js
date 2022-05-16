import { expect } from "chai";
import C003 from "../emulators/c003";
import { colors } from "../src/constants";

describe("C003 Lock", () => {
    const lock = new C003({
        answerKey: {
            c003: "red",
            c003_triad_1: "green",
            c003_triad_2: "orange"
        }
    });

    describe("unlock", () => {
        context("when 'c003' is missing", () => {
            it("should return an 'access denied' error", () => {
                expect(lock.unlock({
                    c003_triad_1: "green",
                    c003_triad_2: "orange"
                })).to.deep.equal(lock.getAccessDeniedMsg());
            });
        });

        context("when no answers are passed in", () => {
            it("should return an 'access denied' error", () => {
                expect(lock.unlock()).to.deep.equal(lock.getAccessDeniedMsg());
            });
        });

        context("when 'c003' is not a color", () => {
            const color = 5;

            it("should return an 'wrong type' error", () => {
                expect(lock.unlock({
                    c003: color,
                    c003_triad_1: "green",
                    c003_triad_2: "orange"
                })).to.deep.equal(lock.getAnswerIsWrongTypeMsg(color, "string"));
            });
        });

        context("when 'c003' is not the correct color", () => {
            const color = "pink";

            it("should return an 'wrong value' error", () => {
                expect(lock.unlock({
                    c003: color,
                    c003_triad_1: "green",
                    c003_triad_2: "orange"
                })).to.deep.equal(lock.getAnswerIsWrongValueMsg(color, "color name"));
            });
        });

        context("when 'c003_triad_1' is missing", () => {
            it("should return a 'param missing' error", () => {
                expect(lock.unlock({
                    c003: "red",
                    c003_triad_2: "orange"
                })).to.deep.equal(lock.getAnswerIsMissingMsg("c003_triad_1"));
            });
        });

        context("when 'c003_triad_1' is not a string", () => {
            const color = 5;

            it("should return a 'wrong type' error", () => {
                expect(lock.unlock({
                    c003: "red",
                    c003_triad_1: color,
                    c003_triad_2: "orange"
                })).to.deep.equal(lock.getAnswerIsWrongTypeMsg(color, "string"));
            });
        });

        context("when 'c003_triad_1' is the wrong color", () => {
            const color = "purple";

            it("should return a 'wrong value' error", () => {
                expect(lock.unlock({
                    c003: "red",
                    c003_triad_1: color,
                    c003_triad_2: "orange"
                })).to.deep.equal(
                    lock.getAnswerIsWrongValueMsg(color, "first triad color")
                );
            });
        });

        context("when 'c003_triad_2' is missing", () => {
            it("should return 'parameter missing' error", () => {
                expect(lock.unlock({
                    c003: "red",
                    c003_triad_1: "cyan"
                })).to.deep.equal(lock.getAnswerIsMissingMsg("c003_triad_2"));
            });
        });

        context("when 'c003_triad_2' not a color", () => {
            const color = 5;
            it("should return a 'wrong type' answer", () => {
                expect(lock.unlock({
                    c003: "red",
                    c003_triad_1: "cyan",
                    c003_triad_2: color
                })).to.deep.equal(lock.getAnswerIsWrongTypeMsg(color, "string"));
            });
        });

        context("when 'c003_triad_2' is the wrong color", () => {
            const color = "yellow";
            it("should return a lock error", () => {
                expect(lock.unlock({
                    c003: "red",
                    c003_triad_1: "cyan",
                    c003_triad_2: color
                })).to.deep.equal(
                    lock.getAnswerIsWrongValueMsg(color, "second triad color")
                );
            });
        });

        context("when all <answer> key/value pairs are correct", () => {
            it("should return a 'lock unlocked' message", () => {
                expect(lock.unlock({
                    c003: "red",
                    c003_triad_1: "cyan",
                    c003_triad_2: "lime"
                })).to.equal(lock.getLockUnlockedMsg());
            });
        });
    });

    describe("buildAnswerKey", () => {
        context("When c003 is defined in the answer key", () => {
            const result = lock.buildAnswerKey({ c003: "red" });

            it("should use the passed in value", () => {
                expect(result.c003).to.equal("red");
            });

            it("should set 'c003_triad_1' based off of 'c003'", () => {
                expect(result.c003_triad_1).to.equal("cyan");
            });

            it("should set 'c003_triad_2' based off of 'c003'", () => {
                expect(result.c003_triad_2).to.equal("lime");
            });
        });

        context("When c003 is not defined in the answer key", () => {
            const result = lock.buildAnswerKey();

            it("should choose a random color for 'c003'", () => {
                expect(result.c003).to.be.oneOf(colors);
            });

            it("should set 'c003_triad_1' based off of 'c003'", () => {
                const colorIndex = colors.indexOf(result.c003);

                expect(result.c003_triad_1).to.equal(
                    colors[(colorIndex + 5) % 8]
                );
            });

            it("should set 'c003_triad_2' based off of 'c003'", () => {
                const colorIndex = colors.indexOf(result.c003);

                expect(result.c003_triad_2).to.equal(
                    colors[(colorIndex + 3) % 8]
                );
            });
        });
    });
});