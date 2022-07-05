import { access, readdir, readFile, writeFile } from "fs/promises";
import { exec as execAsync } from "child_process";
import { linkUserDirectory, writeLineToEnv } from "./src/lib.js";
import chalk from "chalk";
import dotEnv from "dotenv";
import inquirer from "inquirer";
import os from "os";
import path from "path";
import util from "util";
import { createRequire } from "module";
import { configDirectory } from "./src/constants.js";

const require = createRequire(import.meta.url);
const quietList = require("./src/data/quiet-list.json");

const exec = util.promisify(execAsync);
const {
    log: {
        write
    }
} = new inquirer.ui.BottomBar();

const configureEnvironment = async () => {
    const { directory } = await inquirer.prompt([ {
        type: "input",
        name: "directory",
        message: "Where is your Hackmud config directory?",
        default: process.env.configDirectory,
        async validate (directory) {
            if (!directory) {
                return false;
            }

            try {
                await access(directory);
            } catch (e) {
                return `Unable to find ${directory}`;
            }

            const files = await readdir(directory);

            if (!files.some(file => file.includes(".key"))) {
                return `Unable to find users in ${directory}`;
            }

            return true;
        }
    } ]);

    await writeLineToEnv(`configDirectory=${directory}`);

    return directory;
};

const linkUsers = async configDirectory => {
    const results = [];

    const files = await readdir(configDirectory, { withFileTypes: true });
    const users = files
        .filter(file => file.isDirectory());

    const { chosenUsers } = await inquirer.prompt([ {
        type: "checkbox",
        name: "chosenUsers",
        message: "Which user accounts do you want to publish scripts to?",
        choices: users
    } ]);

    if (chosenUsers.length === 0) {
        write(chalk.red("No users selected."));

        await linkUsers(configDirectory);
    }

    for (let i = 0; i < chosenUsers.length; i++) {
        try {
            await linkUserDirectory(configDirectory, chosenUsers[i]);

            results.push(`${chosenUsers[i]}: ${chalk.green("\u2713")}`);
        } catch (/** @type any */e) {
            if (e.stderr.includes("File exists")) {
                results.push(`${chosenUsers[i]}: ${chalk.blueBright("Skipped - already linked")}`);
            } else {
                results.push(`${chosenUsers[i]}: ${chalk.red("Error - " + e.message)}`);
            }
        }
    }

    return results;
};

const updateQuietList = async configureDirectory => {
    const currentSettingsFile = path.resolve(configureDirectory, "settings");
    const currentSettings = JSON.parse(
        await readFile(currentSettingsFile, "utf8")
    );

    currentSettings.gui_quiet = [
        ...new Set(currentSettings.gui_quiet.concat(quietList))
    ].sort();

    await writeFile(
        currentSettingsFile,
        JSON.stringify(currentSettings), "utf8"
    );
};

const run = async () => {
    dotEnv.config();

    try {
        await access(configDirectory);
    } catch (/** @type any */e) {
        try {
            await exec(`mkdir ${configDirectory}`);
        } catch (/** @type any */e) {
            return `Unable to set up environment ${e.message}`;
        }
    }

    let configureDirectory = process.env.configDirectory;

    if (!configureDirectory) {
        configureDirectory = await configureEnvironment();
    }

    const { choice } = await inquirer.prompt([
        {
            type: "list",
            name: "choice",
            message: "Welcome Hackmud! What would you like to do?",
            choices: [
                {
                    name: "Reconfigure my scripting environment",
                    value: "reconfigure"

                },
                {
                    name: "Link my Hackmud users to the scripting environment",
                    value: "link"

                },
                {
                    name: "Update my quiet list with a list of known bots",
                    value: "quiet"

                },
                new inquirer.Separator(),
                {
                    name: "Exit",
                    value: "exit"
                }
            ]
        }
    ]);

    switch (choice) {
        case "reconfigure":
            await configureEnvironment();
            break;
        case "link":
            write((await linkUsers(configureDirectory)).join(os.EOL));
            break;
        case "quiet":
            await updateQuietList(configureDirectory);
            write(chalk.blueBright("Quiet list updated successfully"));
            break;
    }

    return true;
};

run();
