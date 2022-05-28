import Loc from "../emulators/loc.js";
import C001 from "../emulators/c001.js";
import C002 from "../emulators/c002.js";
import C003 from "../emulators/c003.js";
import colorCracker from "../crackers/under-500-characters/color-cracker.js";
import { expect } from "chai";

describe("Color Lock Cracker", () => {
    const c001 = new C001();
    const c002 = new C002();
    const c003 = new C003();

    it("should crack the c001 Lock", () => {
        const loc = new Loc({ locks: [ c001 ] });
        const result = colorCracker({}, { target: loc });

        expect(result).to.include(c001.getLockUnlockedMsg());
    });

    it("should crack the c002 Lock", () => {
        const loc = new Loc({ locks: [ c002 ] });
        const result = colorCracker({}, { target: loc });

        expect(result).to.include(c002.getLockUnlockedMsg());
    });

    it("should crack the c003 Lock", () => {
        const loc = new Loc({ locks: [ c003 ] });
        const result = colorCracker({}, { target: loc });

        expect(result).to.include(c003.getLockUnlockedMsg());
    });

    context("when there are multiple locks", () => {
        it("should crack all the locks", () => {
            const loc = new Loc({ locks: [ c001, c002, c003 ] });
            const result = colorCracker({}, { target: loc });

            expect(result).to.include(c001.getLockUnlockedMsg());
            expect(result).to.include(c002.getLockUnlockedMsg());
            expect(result).to.include(c003.getLockUnlockedMsg());
            expect(result).to.include(loc.CONNECTION_TERMINATED);
        });
    });
});