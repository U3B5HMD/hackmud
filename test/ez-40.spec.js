import { expect } from "chai";
import EZ_40 from "../emulators/ez-40.js";
import { unlockCommands, primes } from "../src/constants.js";

describe("EZ_40 Lock", () => {
    const lock = new EZ_40({
        answerKey: {
            EZ_40: "unlock",
            ez_prime: 11
        }
    });

    describe("unlock", () => {
        context("when 'EZ_40' is missing", () => {
            it("should return an 'access denied' error", () => {
                expect(lock.unlock({ ez_prime: 11 })).to.deep
                    .equal(lock.getAccessDeniedMsg());
            });
        });

        context("when no answers are passed in", () => {
            it("should return an 'access denied' error", () => {
                expect(lock.unlock()).to.deep.equal(lock.getAccessDeniedMsg());
            });
        });

        context("When 'EZ_40' is not a string", () => {
            const command = 5;

            it("should return a 'wrong type' error", () => {
                expect(lock.unlock({ EZ_40: command, ez_prime: 11 })).to.deep
                    .equal(lock.getAnswerIsWrongTypeMsg(command, "unlock command"));
            });
        });

        context("When 'EZ_40' is the wrong unlock command", () => {
            const command = "open";

            it("should return a 'wrong value' error", () => {
                expect(lock.unlock({ EZ_40: command, ez_prime: 11 })).to.deep
                    .equal(lock.getAnswerIsWrongValueMsg(command, "unlock command"));
            });
        });

        context("when 'ez_prime' is missing", () => {
            it("should return an 'parameter missing' error", () => {
                expect(lock.unlock({ EZ_40: "unlock" })).to.deep
                    .equal(lock.getAnswerIsMissingMsg("ez_prime"));
            });
        });

        context("When 'ez_prime' is not a number", () => {
            const prime = "test";

            it("should return 'wrong type' error", () => {
                expect(lock.unlock({ EZ_40: "unlock", ez_prime: prime })).to.deep
                    .equal(lock.getAnswerIsWrongTypeMsg(prime, "prime"));
            });
        });

        context("when 'ez_prime' is < 1", () => {
            it("should return an 'out of range (too small)' error", () => {
                const prime = 0;

                expect(lock.unlock({ EZ_40: "unlock", ez_prime: prime })).to.deep
                    .equal(lock.getAnswerOutOfRangeMsg(prime, "<", 1));
            });
        });

        context("when 'ez_prime' is > 100", () => {
            it("should return an 'out of range (too big)' error", () => {
                const prime = 105;

                expect(lock.unlock({ EZ_40: "unlock", ez_prime: prime })).to.deep
                    .equal(lock.getAnswerOutOfRangeMsg(prime, ">", 100));
            });
        });

        context("When 'ez_prime' is not the correct prime", () => {
            it("should return a 'wrong value' error", () => {
                const prime = 7;

                expect(lock.unlock({ EZ_40: "unlock", ez_prime: prime })).to.deep
                    .equal(lock.getAnswerIsWrongValueMsg(prime, "prime"));
            });
        });

        context("when all <answer> key/value pairs are correct", () => {
            it("should return 'lock unlocked message", () => {
                expect(lock.unlock({ EZ_40: "unlock", ez_prime: 11 })).to.deep
                    .equal(lock.getLockUnlockedMsg());
            });
        });
    });

    describe("buildAnswerKey", () => {
        context("When EZ_40 is defined in the answer key", () => {
            const result = lock.buildAnswerKey({ EZ_40: "unlock" });

            it("should use the passed in value", () => {
                expect(result.EZ_40).to.equal("unlock");
            });
        });

        context("When EZ_40 is not defined in the answer key", () => {
            const result = lock.buildAnswerKey();

            it("should choose a random unlock command for 'EZ_40'", () => {
                expect(result.EZ_40).to.be.oneOf(unlockCommands);
            });
        });

        context("When ez_prime is defined in the answer key", () => {
            const result = lock.buildAnswerKey({ EZ_40: "unlock", ez_prime: 5 });

            it("should use the passed in value", () => {
                expect(result.ez_prime).to.equal(5);
            });
        });

        context("When ez_prime is not defined in the answer key", () => {
            const result = lock.buildAnswerKey({ EZ_40: "unlock" });

            it("should choose a random prime between 1 and 100", () => {
                expect(result.ez_prime).to.be.oneOf(primes);
            });
        });
    });

});
