import { readdir, readFile, writeFile } from "fs/promises";
import babel from "@babel/core";
import path from "path";
import {fileURLToPath} from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Babel config
const config = {
    plugins: [
        "./devops/babel/strip-import-export.js",
        "./devops/babel/strip-function-name.js"
    ],
    presets: [
        "minify",
        [
            "@babel/preset-env",
            {
                targets: {
                    node: "16"
                },
                modules: false
            }
        ]
    ],
    comments: false
};

const run = async () => {
    // Only scripts in these directories get minified.
    const scriptDirectories = [
        path.resolve(__dirname, "../tools"),
        path.resolve(__dirname, "../crackers/under-500-characters"),
        path.resolve(__dirname, "../crackers/")
    ];

    const publishPath = path.resolve(__dirname, "../dist/");
    const userFolders = (
        await readdir(path.resolve(publishPath), { withFileTypes: true })
    )
    .filter((file) => !file.isFile())
    .map(file => file.name)


    // Stores stats about the files to be printed out after the script runs.
    const results = [];

    for (const scriptDirectory of scriptDirectories) {
        const files = (await readdir(scriptDirectory, { withFileTypes: true }))
            .filter(file => file.isFile())
            .map(file => file.name);

        for (const file of files) {
            const filePath = `${scriptDirectory}/${file}`;
            let code = await readFile(filePath, "utf8");
            // Hackmud doesn't allow filenames with "-"
            const finalFilename = file.replace(/-/g, "_");

            let { code: transformedCode } = await babel.transformAsync(
                code, config) || {};

            if (!transformedCode) {
                continue;
            }

            /*
             * Babel thinks that Hackmud scripts that start with a '#' (e.g.,
             * #D, #fs) are references to private class properties or methods.
             * To avoid syntax errors during development we replace '#' with
             * 'Hackmud' and then swap them out during the publishing process.
             */
            transformedCode = transformedCode.replace(/Hackmud./g, "#");

            results.push({
                "Original File": file,
                "Original Size (bytes)": code.length,
                "Final File Size (bytes)": transformedCode.length,
                "Final File": finalFilename
            });

            for (let userFolder of userFolders) {
                try {
                    await writeFile(
                        `${publishPath}/${userFolder}/scripts/${finalFilename}`,
                        transformedCode
                    );

                } catch (e) {
                    throw e;
                }
            }
        }
    }

    console.table(results);
};

run();