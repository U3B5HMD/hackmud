import Loc from "../emulators/loc.js";
import L0cket from "../emulators/l0cket.js";
import EZ_21 from "../emulators/ez-21.js";
import l0cketCracker from "../crackers/l0cket-cracker.js";
import { expect } from "chai";

describe("L0cket Cracker", () => {
    const lock = new L0cket();
    const ez21 = new EZ_21();

    it("should crack the l0cket Lock", () => {
        const loc = new Loc({ locks: [ lock ] });
        l0cketCracker({}, { target: loc });

        expect(lock.isBreached).to.equal(true);
    });

    context("When it encounters a non-l0cket lock", () => {
        it("should return the lock message and bail", () => {
            const loc = new Loc({ locks: [ ez21, lock ] });
            const result = l0cketCracker({}, { target: loc });

            expect(result).to.include(ez21.getAccessDeniedMsg().join("\n"));
        });
    });
});
