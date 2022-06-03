import { fileURLToPath } from "url";
import chai, { expect } from "chai";
import path from "path";
import sinon from "sinon";
import sinonChai from "sinon-chai";
import os from "os";

import {
    linkUserDirectoryWith,
    appendLineToEnvWith
} from "../src/lib.js";

chai.use(sinonChai);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe("linkUserDirectory", () => {
    let exec;
    let accessFile;
    let sandbox;
    let linkUserDirectories;
    let distPath = path.resolve(__dirname, "../dist");
    let configPath = "/configPath";
    let userPath = "user1";

    before(() => {
        sandbox = sinon.createSandbox();

        exec = sandbox.stub();
        accessFile = sandbox.stub();

        linkUserDirectories = linkUserDirectoryWith(accessFile, exec);
    });

    afterEach(() => {
        sandbox.resetBehavior();
        sandbox.resetHistory();
    });

    context("when the user directory doesn't already exist", () => {
        beforeEach(async () => {
            accessFile.throws();

            await linkUserDirectories(configPath, userPath);
        });

        it("should create the user directory", () => {
            expect(exec.getCall(0).args).to.deep.equal(
                [ `mkdir ${distPath}/user1` ]
            );
        });

        it("should create a symlink for the user directory", () => {
            expect(exec.getCall(1).args).to.deep.equal(
                [ `ln -s ${configPath}/${userPath}/scripts ${distPath}/user1` ]
            );
        });
    });

    context("when a user directory already exist", () => {
        beforeEach(async () => {
            accessFile.returns(true);

            await linkUserDirectories(configPath, userPath);
        });

        it("should not try to create the user directory", () => {
            expect(exec).to.not.have.been.calledWith(`mkdir ${distPath}/user1`);
        });

        it("should create a symlink for the user directory", () => {
            expect(exec.getCall(0).args).to.deep.equal(
                [ `ln -s ${configPath}/${userPath}/scripts ${distPath}/user1` ]
            );
        });
    });

});

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
