import { access, readdir } from "fs/promises";
import { exec as execAsync } from "child_process";
import { fileURLToPath } from "url";
import { linkUserDirectory } from "./src/lib.js";
import { writeLineToEnv } from "./src/update-env-file.js";
import chalk from "chalk";
import dotEnv from "dotenv";
import inquirer from "inquirer";
import os from "os";
import path from "path";
import util from "util";

const exec = util.promisify(execAsync);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
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

const run = async () => {
    dotEnv.config();

    const distPath = path.resolve(__dirname, "./dist");
    try {
        await access(distPath);
    } catch (/** @type any */e) {
        try {
            await exec(`mkdir ${distPath}`);
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
    }

    return true;
};

run();

