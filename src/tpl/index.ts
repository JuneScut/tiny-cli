import { loadFile, writeFile } from "../util/file";
import {
  getCwdPath,
  getDirPath,
  loggerError,
  loggerSuccess,
  loggerWarring,
} from "../util";
import download from "download-git-repo";
// const git = require("git-clone");

interface ITpl {
  tplUrl: string;
  name: string;
  desc: string;
}

const cacheTpl = getDirPath("../cacheTpl");

// 更新用户可选择的模板文件列表
export const updateTpl = async (tplUrl: string, name: string, desc: string) => {
  // 判断当前是否存在 tpl 的缓存文件，如果已存在缓存文件，那么需要跟当前的模板信息合并，如果不存在的话则需要创建文件，将获取的信息保存进去。
  try {
    const tplConfig = loadFile<ITpl[]>(`${cacheTpl}/.tpl.json`);
    let file = [
      {
        tplUrl,
        name,
        desc,
      },
    ];
    if (tplConfig) {
      const isExist = tplConfig.some((tpl) => tpl.name === name);
      if (isExist) {
        file = tplConfig.map((tpl) => {
          if (tpl.name === name) {
            return {
              tplUrl,
              name,
              desc,
            };
          }
          return tpl;
        });
      } else {
        file = [...tplConfig, ...file];
      }
    }
    writeFile(cacheTpl, ".tpl.json", file);
    loggerSuccess("Add Template Successful!");
  } catch (error) {
    loggerError(`${error}`);
  }
};

export const getTplList = () => {
  try {
    const tplConfig = loadFile<ITpl[]>(`${cacheTpl}/.tpl.json`);
    if (tplConfig) {
      return tplConfig;
    } else {
      loggerWarring("No template! Please add template first!");
      process.exit(1);
    }
  } catch (err) {
    loggerError(`${err}`);
  }
};

export const loadTpl = (name: string, tplUrl: string, path: string) => {
  // git(tplUrl, getCwdPath(`./${path}`), (err: string) => {
  //   if (err) {
  //     loggerError(err);
  //   } else {
  //     loggerSuccess(`Download ${name} Template Successful!`);
  //   }
  // });
  // 拼接路径，但只能下载文件，不会把 .git 也拉下来.只是一个轻量级的工具
  download(`direct:${tplUrl}`, getCwdPath(`./${path}`), (err: string) => {
    if (err) {
      loggerError(err);
    } else {
      loggerSuccess(`Download ${name} Template Successful!`);
    }
  });
};
