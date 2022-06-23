import chai, { expect } from "chai";
import sinon from "sinon";
import sinonChai from "sinon-chai";
import constantsToDb from "../tools/constants-to-db.js";

chai.use(sinonChai);

describe("constantsToDb", () => {

    before(() => {
        sinon.stub(Hackmud.db, "us");
        constantsToDb();
    });

    afterEach(() => {
        sinon.restore();
    });

    it("should write to the DB using upsert", () => {
        expect(Hackmud.db.us).to.have.been.called;
    });
});
