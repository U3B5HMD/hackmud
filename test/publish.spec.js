import { expect } from "chai";
import { transformFileWith } from "../src/publish.js";
import { createRequire } from "module";
import babel from "@babel/core";

const require = createRequire(import.meta.url);
const babelConfig = require("../devops/babel/config.json");

describe("transformFileWith", () => {
    context("When babelLib and config are defined", () => {
        let babelLib;
        let config;

        before(() => {
            config = babelConfig;
            babelLib = {
                transformAsync: () => Promise.resolve({
                    code: "test"
                })
            };
        });

        it("should return a function", () => {
            expect(transformFileWith(babelLib, config)).to.be.a("function");
        });
    });

    context("When babelLib is not defined", () => {
        let babelLib;
        let config;

        before(() => {
            config = babelConfig;
        });

        it("should throw an exception", () => {
            expect(() => transformFileWith(babelLib, config)).to
                .throw(ReferenceError);
        });
    });

    context("When babelLib is malformed", () => {
        let babelLib;
        let config;

        before(() => {
            babelLib = {};
            config = babelConfig;
        });

        it("should throw an exception", () => {
            expect(() => transformFileWith(babelLib, config)).to
                .throw(ReferenceError);
        });
    });

    context("When babelLib is not an object", () => {
        let babelLib;
        let config;

        before(() => {
            babelLib = true;
            config = babelConfig;
        });

        it("should throw an exception", () => {
            expect(() => transformFileWith(babelLib, config)).to
                .throw(TypeError);
        });
    });

    context("When config is not defined", () => {
        let babelLib;
        let config;

        before(() => {
            babelLib = {
                transformAsync: () => Promise.resolve({
                    code: "Test"
                })
            };
        });

        it("should throw an exception", () => {
            expect(() => transformFileWith(babelLib, config)).to
                .throw(ReferenceError);
        });
    });

    context("When config is an empty object", () => {
        let babelLib;
        let config;

        before(() => {
            config = {};
            babelLib = {
                transformAsync: () => Promise.resolve({
                    code: "Test"
                })
            };
        });

        it("should throw an exception", () => {
            expect(() => transformFileWith(babelLib, config)).to
                .throw(ReferenceError);
        });
    });

    context("When config is not an object", () => {
        let babelLib;
        let config;

        before(() => {
            config = null;
            babelLib = {
                transformAsync: () => Promise.resolve({
                    code: "Test"
                })
            };
        });

        it("should throw an exception", () => {
            expect(() => transformFileWith(babelLib, config)).to
                .throw(TypeError);
        });
    });
});

describe("transformFile", () => {
    context("When the passed in code is valid", () => {
        let transformFile;

        beforeEach(() => {
            transformFile = transformFileWith(babel, babelConfig);
        });

        it("should minify the code", async () => {
            const code = `
                var a = 1;
                var b = 2;
           `;

            const expectedResult = "var a=1,b=2;";

            expect(await transformFile(code)).to.equal(expectedResult);
        });

        it("should remove comments", async () => {
            const code = `
                var a = 1; // test
                var b = 2;
           `;

            const expectedResult = "var a=1,b=2;";

            expect(await transformFile(code)).to.equal(expectedResult);
        });

        it("should strip default variable exports", async () => {
            const code = `
                const foo = () => {};
                var a = 1; // test
                var b = 2;

                export default foo;
           `;

            const expectedResult = "const foo=()=>{};var a=1,b=2;";

            expect(await transformFile(code)).to.equal(expectedResult);
        });

        it("should strip default function exports", async () => {
            const code = "export default function cracker () {}";

            const expectedResult = "function (){}";

            expect(await transformFile(code)).to.equal(expectedResult);
        });

        it("should strip function names", async () => {
            const code = `function myFunc () {};`;

            const expectedResult = "function (){}";

            expect(await transformFile(code)).to.equal(expectedResult);
        });

        it("should strip imports", async () => {
            const code = `
                import myLib from "foo";
                function myFunc () {};
           `;

            const expectedResult = "function (){}";

            expect(await transformFile(code)).to.equal(expectedResult);
        });
    });

    context("When the code contains Hackmud references", () => {
        let babelLib;
        let config;
        let transformFile;
        let code;

        before(() => {
            config = babelConfig;
            code = "Hackmud.fs.fullSec()";
            babelLib = {
                transformAsync: () => Promise.resolve({
                    code
                })
            };

            transformFile = transformFileWith(babelLib, config);
        });

        it("should convert them to scriptors", async () => {
            expect(await transformFile(code)).to.deep.equal(
                "#fs.fullSec()"
            );
        });
    });
});
