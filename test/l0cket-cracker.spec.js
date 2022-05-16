import Loc from "../emulators/loc";
import L0cket from "../emulators/l0cket";
import EZ_21 from "../emulators/ez-21";
import l0cketCracker from "../crackers/under-500-characters/l0cket_cracker";
import { expect } from "chai";

describe("L0cket Cracker", () => {
    const lock = new L0cket();
    const ez21 = new EZ_21();

    it("should crack the l0cket Lock", () => {
        const loc = new Loc({ locks: [ lock ] });
        const result = l0cketCracker({}, { target: loc });

        expect(result).to.include(lock.getLockUnlockedMsg());
    });

    context("When it encounters a non-l0cket lock", () => {
        it("should return the lock message and bail", () => {
            const loc = new Loc({ locks: [ ez21 ] });
            const result = l0cketCracker({}, { target: loc });

            expect(result).to.include(ez21.getAccessDeniedMsg().join("\n"));
            expect(result).to.not.include(loc.CONNECTION_TERMINATED);
        });
    });
});