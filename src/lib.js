import { exec as execAsync } from "child_process";
import { fileURLToPath } from "url";
import {
    readFile as nodeReadFile,
    writeFile as nodeWriteFile,
    access as nodeAccess
} from "fs/promises";
import os from "os";
import path from "path";
import util from "util";

const nodeExec = util.promisify(execAsync);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const linkUserDirectoryWith = (accessFile, exec) =>
    async (gameConfigPath, username) => {
        const distPath = path.resolve(__dirname, "../dist");

        const userPath = path.resolve(distPath, username);

        try {
            await accessFile(userPath);
        } catch (e) {
            await exec(`mkdir ${userPath}`);
        }

        await exec(`ln -s ${gameConfigPath}/${username}/scripts ${userPath}`);

    };

export const linkUserDirectory = linkUserDirectoryWith(nodeAccess, nodeExec);

export const appendLineToEnvWith = (readFile, writeFile, exec) => async data => {
    const envFilePath = path.resolve(__dirname, "../.env");

    await exec(`touch ${envFilePath}`);

    const envData = (await readFile(envFilePath, "utf8"))
        .split(os.EOL)
        .filter(line => line.length);

    const [ key ] = data.split("=");

    const dataIndex = envData.findIndex(el => el.includes(`${key}=`));

    if (dataIndex >= 0) {
        envData[dataIndex] = data;
    } else {
        envData.push(data);
    }

    writeFile(envFilePath, envData.join(os.EOL));
};

export const writeLineToEnv = appendLineToEnvWith(
    nodeReadFile,
    nodeWriteFile,
    nodeExec
);
