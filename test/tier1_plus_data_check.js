import Loc from "../emulators/loc.js";
import C001 from "../emulators/c001.js";
import C002 from "../emulators/c002.js";
import C003 from "../emulators/c003.js";
import EZ_21 from "../emulators/ez-21";
import EZ_35 from "../emulators/ez-35";
import EZ_40 from "../emulators/ez-40";
import L0cket from "../emulators/l0cket";
import omniCracker from "../crackers/tier1_plus_data_check";
import chai, { expect } from "chai";
import sinon from "sinon";
import sinonChai from "sinon-chai";
import Hackmud from "../src/hackmud";
import { l0ckets, colors, unlockCommands, primes } from "../src/constants.js";

chai.use(sinonChai);

describe("OmniCracker", () => {
    const c001 = new C001();
    const c002 = new C002();
    const c003 = new C003();
    const ez21 = new EZ_21();
    const ez35 = new EZ_35();
    const ez40 = new EZ_40();

    const l0cket = new L0cket();

    const sandbox = sinon.createSandbox();

    before(() => {
        sandbox.stub(Hackmud.db, "f").returns({
            array: () => [],
            first: () => ({
                l: l0ckets,
                d: [ ...Array(10).keys() ],
                e: primes,
                c: colors,
                E: unlockCommands
            })
        });
    });

    it("should crack the EZ_21 Lock", () => {
        const loc = new Loc({ locks: [ ez21 ] });
        const result = omniCracker({}, { t: loc });

        expect(result).to.include(ez21.getLockUnlockedMsg());
    });

    it("should crack the EZ_35 Lock", () => {
        const loc = new Loc({ locks: [ ez35 ] });
        const result = omniCracker({}, { t: loc });

        expect(result).to.include(ez35.getLockUnlockedMsg());
    });

    it("should crack the EZ_40 Lock", () => {
        const loc = new Loc({ locks: [ ez40 ] });
        const result = omniCracker({}, { t: loc });

        expect(result).to.include(ez40.getLockUnlockedMsg());
    });

    it("should crack the c001 Lock", () => {
        const loc = new Loc({ locks: [ c001 ] });
        const result = omniCracker({}, { t: loc });

        expect(result).to.include(c001.getLockUnlockedMsg());
    });

    it("should crack the c002 Lock", () => {
        const loc = new Loc({ locks: [ c002 ] });
        const result = omniCracker({}, { t: loc });

        expect(result).to.include(c002.getLockUnlockedMsg());
    });

    it("should crack the c003 Lock", () => {
        const loc = new Loc({ locks: [ c003 ] });
        const result = omniCracker({}, { t: loc });

        expect(result).to.include(c003.getLockUnlockedMsg());
    });

    it("should crack the l0cket Lock", () => {
        const loc = new Loc({ locks: [ l0cket ] });
        const result = omniCracker({}, { t: loc });

        expect(result).to.include(l0cket.getLockUnlockedMsg());
    });

    context("when there are multiple locks", () => {
        it("should crack all the locks", () => {
            const loc = new Loc({ locks: [
                ez21, ez35, ez40, c001, c002, c003
            ] });
            const result = omniCracker({}, { t: loc });

            expect(result).to.include(ez21.getLockUnlockedMsg());
            expect(result).to.include(ez35.getLockUnlockedMsg());
            expect(result).to.include(ez40.getLockUnlockedMsg());
            expect(result).to.include(c001.getLockUnlockedMsg());
            expect(result).to.include(c002.getLockUnlockedMsg());
            expect(result).to.include(c003.getLockUnlockedMsg());
            expect(result).to.include(loc.CONNECTION_TERMINATED);
        });
    });

    context("When it encounters an unknown lock", () => {
        it("should return the lock message and bail", () => {
            const msg = `LOCK_ERROR\nDenied access by FOO \`NGLOCK\` lock.`;
            const glockLock = {
                unlock: () => msg
            };

            const loc = new Loc({ locks: [ ez21, glockLock, ez40 ] });
            const result = omniCracker({}, { t: loc });

            expect(result).to.include(ez21.getLockUnlockedMsg());
            expect(result).to.include(msg);
            expect(result).to.not.include(ez40.getLockUnlockedMsg());
            expect(result).to.not.include(loc.CONNECTION_TERMINATED);
        });
    });
});
