import fs from "fs-extra";
import os from "os";
import { loggerError, loggerSuccess, loggerInfo } from "./index";

export const loadFile = <T = {}>(
  path: string,
  system: boolean = false
): T | false | undefined => {
  const rePath = system ? `${os.homedir()}/${path}` : path;

  try {
    if (!fs.pathExistsSync(rePath)) {
      return false;
    }
    const data = fs.readJsonSync(rePath);
    return data;
  } catch (err) {
    loggerError(`Error reading file from disk: ${rePath}`);
  }
};

export const existsFile = (path: string, system: boolean = false) => {
  const rePath = system ? `${os.homedir()}/${path}` : path;
  loggerInfo(rePath);
  return fs.pathExistsSync(rePath);
};

/**
 * @description: 写入文件
 * @param {string} path
 * @param {string} fileName
 * @param {string} file
 * @return {*}
 */
export const writeFile = (
  path: string,
  fileName: string,
  file: object,
  system: boolean = false
) => {
  const rePath = system ? `${os.homedir()}/${path}` : path;
  loggerInfo(rePath);
  try {
    fs.outputJsonSync(`${rePath}/${fileName}`, file);
    loggerSuccess("Writing file successful!");
  } catch (err) {
    loggerError(`Error writing file from disk: ${err}`);
  }
};
