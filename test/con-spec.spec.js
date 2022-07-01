import chai, { expect } from "chai";
import sinon from "sinon";
import sinonChai from "sinon-chai";
import CON_SPEC from "../emulators/con-spec.js";
import { conspecPatterns } from "../src/constants.js";

chai.use(sinonChai);

describe("CON_SPEC Lock", () => {
    describe("buildAnswerKey", () => {
        context(`When the pattern is ${conspecPatterns[0]}`, () => {

            let config = {};
            let lock;

            beforeEach(() => {
                sinon.stub(Math, "random").returns(1);

                config = {
                    pattern: conspecPatterns[0]
                };

                lock = new CON_SPEC(config);
            });

            afterEach(() => {
                sinon.restore();
            });

            it("should set the lock pattern", () => {
                expect(lock.pattern).to.equal("STUVW");
            });

            it("should use the next three letters for the answer key", () => {
                expect(lock.answerKey.CON_SPEC).to.equal("XYZ");
            });
        });

        context(`When the pattern is ${conspecPatterns[2]}`, () => {

            let config = {};
            let lock;

            beforeEach(() => {
                sinon.stub(Math, "random").returns(1);

                config = {
                    pattern: conspecPatterns[2]
                };

                lock = new CON_SPEC(config);
            });

            afterEach(() => {
                sinon.restore();
            });

            it("should set the lock pattern", () => {
                expect(lock.pattern).to.equal("KMOQS");
            });

            it("should use a random subset of the pattern for the sequence", () => {
                expect(lock.answerKey.CON_SPEC).to.equal("UWY");
            });
        });

        context("When the startIndex and length is set", () => {
            let config = {};
            let lock;

            beforeEach(() => {
                config = {
                    pattern: conspecPatterns[0],
                    startIndex: 5,
                    sequenceLength: 5
                };

                lock = new CON_SPEC(config);
            });

            it("should set the lock pattern", () => {
                expect(lock.pattern).to.equal("FGHIJ");
            });

            it("should use the next three letters for the answer key", () => {
                expect(lock.answerKey.CON_SPEC).to.equal("KLM");
            });
        });
    });

    describe("unlock", () => {
        context("when 'CON_SPEC' is missing", () => {
            let lock;

            before(() => {
                lock = new CON_SPEC();
            });

            it("should return an 'access denied' message", () => {
                expect(lock.unlock({})).to.deep.equal(lock.getAccessDeniedMsg());
            });
        });

        context("when called without parameters", () => {
            let lock;

            before(() => {
                lock = new CON_SPEC();
            });

            it("should return an 'access denied' message", () => {
                expect(lock.unlock()).to.deep.equal(lock.getAccessDeniedMsg());
            });
        });

        context("when 'CON_SPEC' is not a string", () => {
            let answer;
            let lock;

            before(() => {
                answer = 5;
                lock = new CON_SPEC();
            });

            it("should return the puzzle prompt", () => {
                expect(lock.unlock({ CON_SPEC: answer })).to.deep.equal([
                    lock.pattern,
                    "Provide the next three letters in the sequence"
                ].join("\n"));
            });
        });

        context("When 'CON_SPEC' the wrong answer", () => {
            let answer;
            let lock;

            before(() => {
                answer = "GHBNMA";
                lock = new CON_SPEC();
            });

            it("should return the puzzle prompt", () => {
                expect(lock.unlock({ CON_SPEC: answer })).to.deep.equal([
                    lock.pattern,
                    "Provide the next three letters in the sequence"
                ].join("\n"));
            });
        });

        context("when all <answer> key/value pairs are correct", () => {
            let response;
            let lock;

            before(() => {
                lock = new CON_SPEC();
                response = lock.unlock({ CON_SPEC: lock.answerKey.CON_SPEC });
            });

            it("should return a 'lock unlocked' message", () => {
                expect(response).to.deep.equal(lock.getLockUnlockedMsg());
            });

            it("should mark the locked as breached", () => {
                expect(lock.isBreached).to.equal(true);
            });
        });
    });
});
