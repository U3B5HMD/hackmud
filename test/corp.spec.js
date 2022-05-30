import { expect } from "chai";
import Corporation from "../emulators/corp.js";

describe("Corp", () => {
    const corp = new Corporation();

    describe("constructor", () => {
        it("should set the projects", () => {
            expect(corp.projects).to.deep.equal([
                "forgetme_nt",
                "giant_spidr",
                "dsktp_mngr",
                "delete_me_first",
                "cloudskimmer.da7a",
                "empl_pages",
                "judgeme_nt"
            ]);
        });

        it("should set the password", () => {
            expect(corp.password).to.equal("endtheworld");
        });

        it("should set the secret command", () => {
            expect(corp.secretCommand).to.equal("employees");
        });
    });

    describe("printHeader", () => {
        it("should return the header", () => {
            expect(corp.printHeader()).to.equal(corp.header);
        });
    });

    describe("printHeader", () => {
        it("should return the corporation's header", () => {
            expect(corp.printHeader()).to.equal(corp.header);
        });
    });

    describe("printInstructions", () => {
        it("should return the instructions for the corporation's page", () => {
            expect(corp.printInstructions()).to.equal(
                [
                    `Please specify a command with command:"<command name>"`,
                    `Public commands are "strategy" "latest"`,
                    `-- access directory with command:"employees"`
                ].join("\n")
            );
        });
    });

    describe("printProjects", () => {
        const posts = corp.printProjects().join("");
        for (let project of corp.projects) {
            it(`should return a phrase that includes '${project}'`, () => {
                expect(posts.includes(project)).to.equal(true);
            });
        }
    });

    describe("printPassword", () => {
        it("should return a prhase that contains the password", () => {
            expect(corp.printPassword())
                .to.include(`strategy ${corp.password}`);
        });
    });

    describe("printLocs", () => {
        it("should return an array", () => {
            expect(corp.printLocs()).to.be.an("array");
        });
    });

    describe("call", () => {
        context("when called with no args", () => {
            it("should return the corporation's header", () => {
                expect(corp.call()).to.equal(corp.header);
            });
        });

        context("when called with an empty object", () => {
            it("should return the instructions for the corporation's page", () => {
                expect(corp.call({})).to.equal(corp.printInstructions());
            });
        });

        context("when called with the 'latest' command", () => {
            it("should return the corporation's blog", () => {
                expect(corp.call({ command: "latest" }))
                    .to.deep.equal(corp.printProjects());
            });
        });

        context("when called with the 'strategy' command", () => {
            it("should return the corporation's password", () => {
                expect(corp.call({ command: "strategy" }))
                    .to.equal(corp.printPassword());
            });
        });

        context("when called with the secret command and wrong password", () => {
            it("should return 'Incorrect password.'", () => {
                expect(corp.call({
                    command: corp.secretCommand,
                    password: "password2"
                })).to.equal("Incorrect password.");
            });
        });

        context("when called with the secret command and no password", () => {
            it("should return 'No password specified.'", () => {
                expect(corp.call({ command: corp.secretCommand }))
                    .to.equal("No password specified.");
            });
        });

        context("when called with the secret command and correct password", () => {
            it("should return 'Authenticated. Please specify a project to get a member list.'", () => {
                expect(corp.call({
                    command: corp.secretCommand,
                    password: corp.password
                })).to.equal("Authenticated. Please specify a project to get a member list.");
            });
        });

        context("when called with the secret command, correct password, and a valid project", () => {
            it("should return a list of locs", () => {
                expect(corp.call({
                    command: corp.secretCommand,
                    password: corp.password,
                    project: corp.projects[0]
                })).to.deep.equal(corp.printLocs());
            });
        });

        context("when called with the secret command, correct password, and an invalid project", () => {
            it("should return the corporation's header", () => {
                expect(corp.call({
                    command: corp.secretCommand,
                    password: corp.password,
                    project: "invalid"
                })).to.deep.equal(corp.printHeader());
            });
        });
    });
});
