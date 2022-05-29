import path from "path";
import os from "os";
import {
    readFile as nodeReadFile,
    writeFile as nodeWriteFile
} from "fs/promises";
import { fileURLToPath } from "url";
import util from "util";
import { exec as execAsync } from "child_process";

const execNode = util.promisify(execAsync);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
    execNode
);