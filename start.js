const fs = require("fs/promises");
const inquirer = require("inquirer");
const path = require("path");
const util = require("util");
const exec = util.promisify(require("child_process").exec);

const {
    log: {
        write
    }
} = new inquirer.ui.BottomBar();

const run = async () => {
    const { default: chalk } = await import("chalk");

    const linkUsers = async (directory, users) => {
        const { linkedUsers } = await inquirer.prompt([ {
            type: "checkbox",
            name: "linkedUsers",
            message: "Which user accounts do you want to publish scripts to?",
            choices: users
        } ]);

        if (linkedUsers.length > 0) {
            const distPath = path.resolve(process.cwd(), `./dist/`);

            try {
                await exec(`mkdir ${distPath}`);
            } catch (e) {}

            for (let user of linkedUsers) {
                const userPath = path.resolve(distPath, user);

                try {
                    await fs.access(userPath);
                } catch (e) {
                    await exec(`mkdir -p ${userPath}`);
                }

                try {
                    await exec(`ln -s ${directory}/${user}/scripts ${userPath}`);
                    write(chalk.blueBright(`Linking ${userPath}`));
                } catch (/** @type {any} */ e) {
                    if (e.stderr.includes("File exists")) {
                        write(chalk.blueBright(`${userPath} already exists`));
                    } else {
                        throw e;
                    }
                }
            }

            write(chalk.greenBright("Environment setup complete"));
        }

        return await start();
    };

    const configureDirectory = async () => {
        const { directory } = await inquirer.prompt([
            {
                type: "input",
                name: "directory",
                message: "Where is your Hackmud config directory?",
                async validate (directory) {
                    if (!directory) {
                        return false;
                    }

                    try {
                        await fs.access(directory);
                    } catch (e) {
                        return `Unable to find ${directory}`;
                    }

                    const files = await fs.readdir(directory);

                    if (!files.some(file => file.includes(".key"))) {
                        return `Unable to find users in ${directory}`;
                    }

                    return true;
                }
            }
        ]);

        const files = await fs.readdir(directory);
        const users = files
            .filter(file => file.includes(".key"))
            .map(user => user.split(".")[0]);

        return { directory, users };
    };

    const start = async () => {
        const { choice } = await inquirer.prompt([
            {
                type: "list",
                name: "choice",
                message: "Welcome Hackmud! What would you like to do?",
                choices: [
                    {
                        name: "Set up my scripting environment",
                        value: "setup"

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
            case "setup":
                const { directory, users } = await configureDirectory();
                await linkUsers(directory, users);
        }
    };

    await start();
};

run();

