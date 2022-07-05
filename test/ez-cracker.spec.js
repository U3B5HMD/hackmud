import Loc from "../emulators/loc.js";
import EZ_21 from "../emulators/ez-21.js";
import EZ_35 from "../emulators/ez-35.js";
import EZ_40 from "../emulators/ez-40.js";
import ezCracker from "../crackers/ez-cracker.js";
import { expect } from "chai";
import L0cket from "../emulators/l0cket.js";

describe("EZ Cracker", () => {
    const ez21 = new EZ_21();
    const ez35 = new EZ_35();
    const ez40 = new EZ_40();
    const l0cket = new L0cket();

    beforeEach(() => {
        ez21.rotate();
        ez35.rotate();
        ez40.rotate();
    });

    it("should crack the EZ_21 Lock", () => {
        const loc = new Loc({ locks: [ ez21 ] });
        const result = ezCracker({}, { target: loc });

        expect(result).to.include(ez21.getLockUnlockedMsg());
    });

    it("should crack the EZ_35 Lock", () => {
        const loc = new Loc({ locks: [ ez35 ] });
        const result = ezCracker({}, { target: loc });

        expect(result).to.include(ez35.getLockUnlockedMsg());
    });

    it("should crack the EZ_40 Lock", () => {
        const loc = new Loc({ locks: [ ez40 ] });
        const result = ezCracker({}, { target: loc });

        expect(result).to.include(ez40.getLockUnlockedMsg());
    });

    context("when there are multiple locks", () => {
        it("should crack all the locks", () => {
            const locks = [ ez21, ez35, ez40 ];
            const loc = new Loc({ locks });

            ezCracker({}, { target: loc });

            expect(locks.every(lock => lock.isBreached)).to.equal(true);
        });
    });

    context("When it encounters a non-EZ lock", () => {
        it("should return the lock message and bail", () => {
            const loc = new Loc({ locks: [ ez21, l0cket, ez40 ] });
            const result = ezCracker({}, { target: loc });

            expect(ez21.isBreached).to.equal(true);
            expect(result).to.include(l0cket.getAccessDeniedMsg().join("\n"));
            expect(ez40.isBreached).to.equal(false);
        });
    });
});
