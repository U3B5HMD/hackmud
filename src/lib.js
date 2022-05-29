import path from "path";
import { fileURLToPath } from "url";
import util from "util";
import {
    access as nodeAccess
} from "fs/promises";
import { exec as execAsync } from "child_process";

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