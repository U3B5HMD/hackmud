import Loc from "../emulators/loc.js";
import C001 from "../emulators/c001.js";
import C002 from "../emulators/c002.js";
import C003 from "../emulators/c003.js";
import EZ_21 from "../emulators/ez-21.js";
import colorCracker from "../crackers/color-cracker.js";
import { expect } from "chai";

const singleLockTest = lock => {
    context(`When the loc has a single ${lock.type} lock`, function () {
        let loc;

        before(() => {
            loc = new Loc({ locks: [ lock ] });

            colorCracker({}, { target: loc });
        });

        it("should crack the lock", () => {
            expect(lock.isBreached).to.equal(true);
        });
    });
};

describe("Color Lock Cracker", () => {
    singleLockTest(new C001());
    singleLockTest(new C002());
    singleLockTest(new C003());

    context("when there are multiple locks", () => {
        let loc;
        let locks;

        before(() => {
            locks = [ new C001(), new C002(), new C003() ];
            loc = new Loc({ locks });

            colorCracker({}, { target: loc });
        });

        it("should crack all the locks", () => {
            expect(locks.every(lock => lock.isBreached)).to.equal(true);
        });
    });

    context("when the loc has a non-color lock", () => {
        let loc;
        let locks;
        let result;
        let ez21 = new EZ_21();
        before(() => {
            locks = [ new C001(), ez21, new C002(), new C003() ];
            loc = new Loc({ locks });

            result = colorCracker({}, { target: loc });
        });

        it("should bail and return the lock response", () => {
            expect(result).to.include(
                ez21.getAccessDeniedMsg().join(EZ_21.MSG_LINE_SEPERATOR)
            );
        });
    });
});
