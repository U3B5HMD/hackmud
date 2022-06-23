import Loc from "../emulators/loc.js";
import C001 from "../emulators/c001.js";
import C002 from "../emulators/c002.js";
import C003 from "../emulators/c003.js";
import EZ_21 from "../emulators/ez-21.js";
import EZ_35 from "../emulators/ez-35.js";
import EZ_40 from "../emulators/ez-40.js";
import L0cket from "../emulators/l0cket.js";
import { lockConstants } from "../src/constants.js";

import tier1Cracker from "../crackers/omni-cracker-v1.js";
import chai, { expect } from "chai";
import sinon from "sinon";
import sinonChai from "sinon-chai";
import { default as DATA_CHECK_V1 } from "../emulators/data-check.js";

chai.use(sinonChai);

const basicLockTest = lock => {
    context(`When the loc has a single ${lock.type} lock`, () => {
        const loc = new Loc({ locks: [ lock ] });
        const now = Date.now();
        let clock;
        const sandbox = sinon.createSandbox();

        before(() => {
            clock = sinon.useFakeTimers(now);

            global._START = now;
            sandbox.stub(Hackmud.db, "f")
                .returns({
                    first: () => {},
                    array: () => []
                })
                .withArgs({ _id: "constants" })
                .returns({
                    first: () => lockConstants,
                    array: () => [ lockConstants ]
                });

            if (lock.answerKey.DATA_CHECK) {
                sandbox.stub(Hackmud.fs.lore, "data_check").returns({
                    answer: lock.answerKey.DATA_CHECK
                });
            }
        });

        after(() => {
            sandbox.restore();
            clock.restore();
        });

        it("should crack it", () => {
            tier1Cracker({}, { t: loc });

            expect(lock.isBreached).to.equal(true);
        });
    });
};

describe("Omni Cracker", () => {
    basicLockTest(new EZ_21());
    basicLockTest(new EZ_35());
    basicLockTest(new EZ_40());
    basicLockTest(new C001());
    basicLockTest(new C002());
    basicLockTest(new C003());
    basicLockTest(new L0cket());

    const DataCheck = new DATA_CHECK_V1();
    DataCheck.answerKey.DATA_CHECK = "test";

    basicLockTest(DataCheck);

    context("when there are multiple Tier 1 locks", () => {
        const ez21 = new EZ_21();
        const ez35 = new EZ_35();
        const ez40 = new EZ_40();
        const c001 = new C001();
        const c002 = new C002();
        const c003 = new C003();
        const dataCheck = new DATA_CHECK_V1();
        const sandbox = sinon.createSandbox();
        const now = Date.now();
        let clock;

        dataCheck.answerKey.DATA_CHECK = "test";

        before(() => {
            sandbox.stub(Hackmud.db, "f")
                .returns({
                    first: () => {},
                    array: () => []
                })
                .withArgs({ _id: "constants" })
                .returns({
                    first: () => lockConstants,
                    array: () => [ lockConstants ]
                });

            clock = sinon.useFakeTimers(now);

            global._START = now;
            sandbox.stub(Hackmud.fs.lore, "data_check").returns({
                answer: dataCheck.answerKey.DATA_CHECK
            });
        });

        after(() => {
            sandbox.restore();
            clock.restore();
        });

        it("should crack all the locks", () => {
            const locks = [ ez21, ez35, ez40, c001, c002, c003, dataCheck ];
            const loc = new Loc({ locks });

            tier1Cracker({}, { t: loc });

            expect(locks.every(lock => lock.isBreached));
        });
    });

    context("When there are answers from previous breach attempts", () => {
        let locSpy;
        const ez21 = new EZ_21();
        const ez35 = new EZ_35();

        const locks = [ ez21, ez35 ];
        const loc = new Loc({ locks });
        const sandbox = sinon.createSandbox();

        before(() => {
            locSpy = sandbox.spy(loc, "call");

            global._START = Date.now();
            sandbox.stub(Hackmud.db, "f")
                .returns({
                    first: () => {},
                    array: () => []
                })
                .withArgs({ _id: "constants" })
                .returns({
                    first: () => lockConstants,
                    array: () => [ lockConstants ]
                })
                .withArgs({ _id: loc.name })
                .returns({
                    first: () => ez21.answerKey,
                    array: () => [ ez21.answerKey ]
                });

            tier1Cracker({}, { t: loc });
        });

        after(() => {
            sandbox.restore();
        });

        it("should call the lock with those answers", () => {
            expect(locSpy.getCall(0).args).to.deep.equal([ ez21.answerKey ]);
        });
    });

    context("when the script runs out of time", () => {
        const ez21 = new EZ_21();
        const ez35 = new EZ_35();
        const ez40 = new EZ_40();
        const c001 = new C001();
        const c002 = new C002();
        const c003 = new C003();
        const dataCheck = new DATA_CHECK_V1();
        const sandbox = sinon.createSandbox();
        const now = Date.now();
        let clock;

        dataCheck.answerKey.DATA_CHECK = "test";

        beforeEach(() => {
            sandbox.stub(Hackmud.db, "us");

            sandbox.stub(Hackmud.db, "f")
                .returns({
                    first: () => {},
                    array: () => []
                })
                .withArgs({ _id: "constants" })
                .returns({
                    first: () => lockConstants,
                    array: () => [ lockConstants ]
                });

            clock = sandbox.useFakeTimers(now);

            sandbox.stub(Hackmud.fs.lore, "data_check").returns({
                answer: dataCheck.answerKey.DATA_CHECK
            });

        });

        afterEach(() => {
            sandbox.restore();
            clock.restore();
        });

        it("should save answers to the database", () => {
            const locks = [ ez21, ez35, ez40, c001, c002, c003, dataCheck ];
            const loc = new Loc({ locks });

            c002.unlock = () => {
                clock.tick(5000);
                return c002.getAnswerIsWrongTypeMsg("answer", "string");
            };

            tier1Cracker({}, { t: loc });

            const answers = {
                ...ez21.answerKey,
                ...ez35.answerKey,
                ...ez40.answerKey,
                ...c001.answerKey
            };

            expect(Hackmud.db.us).to.have.been.calledWith(
                { _id: loc.name },
                { $set: { value: answers } }
            );
        });

        it("should return the last lock response", () => {
            const locks = [ ez21, ez35, ez40, c001, c002, c003, dataCheck ];
            const loc = new Loc({ locks });

            c002.unlock = () => {
                clock.tick(5000);
                return c002.getAnswerIsWrongTypeMsg("answer", "string");
            };

            const response = tier1Cracker({}, { t: loc });

            expect(response).to.be.a("string");
        });
    });

    context(`When the cracker encounters an unknown lock type`, () => {
        const lock = new EZ_21();
        lock.type = "FAKE_LOCK";

        const loc = new Loc({ locks: [ lock ] });
        const now = Date.now();
        let clock;
        const sandbox = sinon.createSandbox();

        before(() => {
            clock = sandbox.useFakeTimers(now);
            global._START = now;

            sandbox.stub(Hackmud.db, "f")
                .returns({
                    first: () => {},
                    array: () => []
                })
                .withArgs({ _id: "constants" })
                .returns({
                    first: () => lockConstants,
                    array: () => [ lockConstants ]
                });
        });

        after(() => {
            sandbox.restore();
            clock.restore();
        });

        it("should bail and return the last loc response", () => {
            const response = tier1Cracker({}, { t: loc });

            expect(response).to.equal(
                lock.getAccessDeniedMsg().join(EZ_21.MSG_LINE_SEPERATOR)
            );

        });
    });
});
