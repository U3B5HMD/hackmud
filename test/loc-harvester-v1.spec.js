import chai, { expect } from "chai";
import locHarvester from "../tools/loc-harvester-v1.js";
import sinonChai from "sinon-chai";
import sinon from "sinon";
import Corp from "../emulators/corp.js";

chai.use(sinonChai);

describe("Loc Harvester", () => {
    const corp = new Corp();
    const sandbox = sinon.createSandbox();

    beforeEach(() => {
        sandbox.spy(corp, "call");
        locHarvester({}, { t: corp });
    });

    afterEach(() => {
        sandbox.restore();
    });

    for (let project of corp.projects) {
        it(`should get the locs for the '${project}' project`, () => {
            expect(corp.call).to.have.been.calledWith(sinon.match({
                project
            }));
        });
    }

    it("should call the corp with the correct command", () => {
        expect(corp.call).to.have.been.calledWith(sinon.match({
            command: "employees"
        }));
    });

    it("should call the corp with the correct password", () => {
        expect(corp.call).to.have.been.calledWith(sinon.match({
            password: "endtheworld"
        }));
    });
});
