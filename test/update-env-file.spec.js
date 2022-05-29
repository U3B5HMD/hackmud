import sinon from "sinon";
import sinonChai from "sinon-chai";
import chai, { expect } from "chai";
import path from "path";
import { appendLineToEnvWith } from "../src/update-env-file.js";
import os from "os";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


chai.use(sinonChai);

describe("writeLineToEnv", () => {
    let exec;
    let readFile;
    let sandbox;
    let writeFile;
    let writeLineToEnv;

    before(() => {
        sandbox = sinon.createSandbox();

        readFile = sandbox.stub().returns(Promise.resolve([
            "FIELD_1=field1",
            "FIELD_2=field2",
            "FIELD_3=field3"
        ].join(os.EOL)));

        exec = sandbox.stub();

        writeFile = sandbox.stub().returns(Promise.resolve(true));
        writeLineToEnv = appendLineToEnvWith(readFile, writeFile, exec);
    });

    const envPath = path.resolve(__dirname, "../.env");

    beforeEach(() => {
        sandbox.resetHistory();
    });

    it("should attempt to create the .env file", async () => {
        await writeLineToEnv("value=3");

        expect(exec).to.have.been.calledWith(`touch ${envPath}`);
    });

    context("when the passed in value already exists", () => {
        it("should update the existing value", async () => {
            await writeLineToEnv("FIELD_3=updated");

            expect(writeFile).to.have.been.calledWith(
                envPath,
                [
                    "FIELD_1=field1",
                    "FIELD_2=field2",
                    "FIELD_3=updated"
                ].join(os.EOL)
            );
        });
    });

    context("when the passed in value does not already exists", () => {
        it("should update the existing value", async () => {
            await writeLineToEnv("FIELD_4=new");

            expect(writeFile).to.have.been.calledWith(
                envPath,
                [
                    "FIELD_1=field1",
                    "FIELD_2=field2",
                    "FIELD_3=field3",
                    "FIELD_4=new"
                ].join(os.EOL)
            );
        });
    });


    after(() => {
        sandbox.restore();
    });

});