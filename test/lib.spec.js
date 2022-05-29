import { fileURLToPath } from "url";
import chai, { expect } from "chai";
import path from "path";
import sinon from "sinon";
import sinonChai from "sinon-chai";

import {
    linkUserDirectoryWith
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