import chai, { expect } from "chai";
import sinonChai from "sinon-chai";
import sinon from "sinon";
import Lock from "../src/lock.js";

chai.use(sinonChai);

const buildLockError = msg => [ Lock.LOCK_ERROR, msg ];

describe("Lock", () => {
    const baseLockConfig = {
        type: "TEST",
        company: "HALPERYON SYSTEMS",
        answerKey: {
            digit: 5
        }
    };

    describe("buildAnswerKey", () => {
        const lock = new Lock(baseLockConfig);

        context("when called with no arguments", () => {
            it("should return an empty object", () => {
                expect(lock.buildAnswerKey()).to.deep.equal({});
            });
        });

        context("when called with arguments", () => {
            it("should return the arguments it's been passed", () => {
                const args = { test: true };

                expect(lock.buildAnswerKey(args)).to.deep.equal(args);
            });
        });
    });

    describe("quoteIfString", () => {
        const lock = new Lock(baseLockConfig);

        context("When <value> is a string", () => {
            const value = "5";

            it("should wrap <value> in double quotes", () => {
                expect(lock.quoteIfString(value)).to.equal(`"${value}"`);
            });
        });

        context("When <value> is a number", () => {
            const value = 5;

            it("should not wrap <value> in double quotes", () => {
                expect(lock.quoteIfString(value)).to.equal(value);
            });
        });
    });

    describe("getAccessDeniedMsg", () => {
        const lock = new Lock(baseLockConfig);
        const {
            company,
            type
        } = baseLockConfig;

        const expectedResult = buildLockError(`Denied access by ${company} \`N${type}\` lock.`);

        it("should return 'Denied access by <company> <type> lock.'", () => {
            expect(lock.getAccessDeniedMsg()).to.deep.equal(expectedResult);
        });
    });

    describe("getAnswerIsWrongTypeMsg", () => {
        const lock = new Lock(baseLockConfig);

        context("When <answer> is a string and <type> is 'number'", () => {
            const answer = "test";

            it("should return '<answer>' is not a <type>.'", () => {
                expect(lock.getAnswerIsWrongTypeMsg(answer, "number"))
                    .to.deep.equal(buildLockError(`\`N"${answer}"\` is not a number.`));
            });
        });

        context("When <answer> is a number and <type> is 'string'", () => {
            const answer = 5;

            it("should return '<answer>' is not a <type>.'", () => {
                expect(lock.getAnswerIsWrongTypeMsg(answer, "string"))
                    .to.deep.equal(buildLockError(`\`N${answer}\` is not a string.`));
            });
        });
    });

    describe("getAnswerOutOfRangeMsg", () => {
        const lock = new Lock(baseLockConfig);

        context("When <answer> is greater than <limit>", () => {
            const answer = 10;

            it("should return '<answer> is too bag. Correct value is below <limit>.'", () => {
                expect(lock.getAnswerOutOfRangeMsg(answer, ">", 9))
                    .to.deep.equal(buildLockError(`\`V${answer}\` is too big. Correct value is below 9.`));
            });
        });

        context("When <answer> is less than <limit>", () => {
            const answer = -4;

            it("should return '<answer> is too small. Correct value is below <limit>.'", () => {
                expect(lock.getAnswerOutOfRangeMsg(answer, "<", 0))
                    .to.deep.equal(buildLockError(`\`V${answer}\` is not above -1.`));
            });
        });

        context("When <comparison> is not '<' or '>'", () => {
            const result = () => lock.getAnswerOutOfRangeMsg(-5, "<=", 0);

            it("should throw an error", () => {
                expect(result).to.throw("Invalid operator: expected '>' or '<'.");
            });
        });

        context("When <answer> is not a number", () => {
            /** @type {any} */
            const answer = "Q";

            const result = () => lock.getAnswerOutOfRangeMsg(answer, "<", 0);

            it("should throw an error", () => {
                expect(result).to.throw("\"Q\" is not a number.");
            });
        });

        context("When <limit> is not a number", () => {
            /** @type {any} */
            const limit = "Z";

            const result = () => lock.getAnswerOutOfRangeMsg(-5, "<", limit);

            it("should throw an error", () => {
                expect(result).to.throw("\"Z\" is not a number.");
            });
        });
    });

    describe("getAnswerIsMissingMsg", () => {
        const lock = new Lock(baseLockConfig);
        const parameter = "digit";

        it("should return 'Required unlock parameter <parameter> is missing.'", () => {
            expect(lock.getAnswerIsMissingMsg(parameter))
                .to.deep.equal(buildLockError(`Required unlock parameter \`N${parameter}\` is missing.`));
        });
    });

    describe("isAnswerKeyEmpty", function () {
        const lock = new Lock(baseLockConfig);

        context("when the answer key is an empty object", () => {
            it("should return true", () => {
                expect(lock.isAnswerKeyEmpty({})).to.equal(true);
            });
        });

        context("when the answer key is not an empty object", () => {
            it("should return true", () => {
                expect(lock.isAnswerKeyEmpty({ test: true })).to.equal(false);
            });
        });
    });

    describe("getLockUnlockedMsg", () => {
        const lock = new Lock(baseLockConfig);

        it("should return 'LOCK_UNLOCKED <type>.'", () => {
            expect(lock.getLockUnlockedMsg())
                .to.equal(`LOCK_UNLOCKED ${baseLockConfig.type}.`);
        });
    });

    describe("unlock", () => {
        const lock = new Lock(baseLockConfig);

        it("should throw an error", () => {
            expect(() => lock.unlock()).to.throw(
                "Method must be implemented by inheriting class."
            );
        });
    });

    describe("rotate", () => {
        const lock = new Lock(baseLockConfig);
        lock.isBreached = true;

        sinon.spy(lock, "buildAnswerKey");

        lock.rotate();

        it("should set 'isBreached' to false", () => {
            expect(lock.isBreached).to.equal(false);
        });

        it("should generate a new answer key", () => {
            expect(lock.buildAnswerKey).to.have.been.calledWith();
        });
    });
});
