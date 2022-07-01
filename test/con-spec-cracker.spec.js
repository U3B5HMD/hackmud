import Loc from "../emulators/loc.js";
import CON_SPEC from "../emulators/con-spec.js";
import conSpecCracker from "../crackers/con-spec-cracker.js";
import { expect } from "chai";

describe("CON_SPEC Cracker", () => {
    const lock = new CON_SPEC();

    it("should crack the CON_SPEC Lock", () => {
        const loc = new Loc({ locks: [ lock ] });
        conSpecCracker({}, { t: loc });

        expect(lock.isBreached).to.equal(true);
    });
});
