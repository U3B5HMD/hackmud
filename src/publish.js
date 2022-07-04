/**
 * @filedesc Publishes scripts to the Hackmud game directory.
 */

import nodeFs from "fs/promises";
import babel from "@babel/core";
import nodePath from "path";
import { fileURLToPath } from "url";
import { createRequire } from "module";
import { configDirectory } from "../src/constants.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = nodePath.dirname(__filename);
const require = createRequire(import.meta.url);
const babelConfig = require("../devops/babel/config.json");

export const transformFileWith = (babelLib, babelConfig) => {
    if (babelLib === undefined) {
        throw new ReferenceError("Expected babelLib to be defined");
    }

    if (babelLib === null || typeof babelLib !== "object") {
        throw new TypeError("Expected babelLib to be an object");
    }

    if (typeof babelLib.transformAsync !== "function") {
        throw new ReferenceError("Expected babelLib.transformAsync to be a function");
    }

    if (babelConfig === undefined) {
        throw new ReferenceError("babelConfig is required");
    }

    if (babelConfig === null || typeof babelConfig !== "object") {
        throw new TypeError("Expected babelConfig to be an object");
    }

    if (Object.keys(babelConfig).length === 0) {
        throw new ReferenceError("Expected babelConfig to not be an empty object");
    }

    return async code => {
        const transformedCode = (await babelLib.transformAsync(code, babelConfig)).code;

        /*
         * Babel thinks that Hackmud scripts that start with a '#' (e.g.,
         * #D, #fs) are references to private class properties or methods.
         * To avoid syntax errors during development we replace '#' with
         * 'Hackmud' and then swap them out during the publishing process.
         */
        return transformedCode.replace(/Hackmud./g, "#");
    };
};

export const transformFile = transformFileWith(babel, babelConfig);

export const publishWith = (fs, path, transform) => {
    let cache = {};

    return async (source, destination) => {
        let destinationFilename;
        let transformedCode;
        const sourceFilename = path.basename(source);

        if (cache[sourceFilename]) {
            destinationFilename = cache[sourceFilename].filename;
            transformedCode = cache[sourceFilename].code;

            await fs.writeFile(
                `${destination}/${destinationFilename}`,
                transformedCode
            );

            return cache[sourceFilename].stats;
        }

        const sourceCode = await fs.readFile(source, "utf8");
        transformedCode = await transform(sourceCode);

        // Hackmud doesn't allow filenames with "-"
        destinationFilename = sourceFilename.replace(/-/g, "_");

        const stats = {
            file: sourceFilename,
            originalSize: sourceCode.length,
            finalSize: transformedCode.length,
            finalName: destinationFilename
        };

        await fs.writeFile(
            `${destination}/${destinationFilename}`,
            transformedCode
        );

        cache[sourceFilename] = {
            filename: destinationFilename,
            code: transformedCode,
            stats
        };

        return stats;
    };
};

export const publish = publishWith(nodeFs, nodePath, transformFile);

export default async function () {
    // Only scripts in these directories get minified.
    const scriptDirectories = [
        nodePath.resolve(__dirname, "../tools"),
        nodePath.resolve(__dirname, "../crackers/")
    ];

    let userFolders = await nodeFs.readdir(
        configDirectory,
        { withFileTypes: true }
    );

    userFolders = userFolders
        .filter(file => !file.isFile())
        .map(file => `${configDirectory}/${file.name}/scripts`);

    // public dist folder
    userFolders.push(nodePath.resolve(__dirname, "../dist"));

    let stats = [];
    let scriptsToTransform = [];

    for (let scriptDirectory of scriptDirectories) {
        scriptsToTransform = scriptsToTransform.concat(
            (await nodeFs.readdir(
                scriptDirectory,
                { withFileTypes: true }
            ))
                .filter(file => file.isFile())
                .map(file => `${scriptDirectory}/${file.name}`)
        );
    }

    for (let script of scriptsToTransform) {
        let publishStats = true;
        for (let userFolder of userFolders) {
            const stat = await publish(script, userFolder);

            if (publishStats) {
                stats.push(stat);
                publishStats = false;
            }
        }
    }

    console.table(stats);
};
