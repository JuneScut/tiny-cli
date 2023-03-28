import { loggerError } from "./../util/index";
import { getTplList, loadTpl, updateTpl } from "../tpl";
import inquirer from "inquirer";
import { Subject } from "rxjs";

interface ITpl {
  tplUrl: string;
  name: string;
  desc: string;
  org?: string;
  downloadUrl?: string;
  apiUrl?: string;
}

const promptList = [
  {
    type: "input",
    message: "请输入仓库地址:",
    name: "tplUrl",
    default: "https://github.com/JuneScut/react-tpl.git",
  },
  {
    type: "input",
    message: "模板标题(默认为 Git 名作为标题):",
    name: "name",
    default({ tplUrl }: { tplUrl: string }) {
      const gitName = tplUrl.substring(tplUrl.lastIndexOf("/") + 1);
      const name = gitName.substring(0, gitName.lastIndexOf(".git"));
      return name;
    },
  },
  {
    type: "input",
    message: "描述:",
    name: "desc",
  },
];

// 添加用户可选择的模板
export const addTpl = () => {
  inquirer.prompt(promptList).then((answers: any) => {
    const { tplUrl, name, desc } = answers;
    updateTpl(tplUrl, name, desc);
  });
};

// 提示让用户选择对应模板下载
// TODO: 1. 选择模板后，可以选择分支
export const selectTpl = () => {
  const prompts: any = new Subject();
  let select: ITpl;
  let githubName: string;
  let path: string;
  let loadUrl: string;

  const tplList = getTplList() || [];

  try {
    const onEachAnswer = async (result: any) => {
      const { name, answer } = result;
      if (name === "name") {
        githubName = answer;
        select = tplList.filter((tpl: ITpl) => tpl.name === answer)[0];

        if (select.tplUrl.includes("github.com")) {
          const pathname = new URL(select.tplUrl).pathname;
          select.org = pathname
            .substring(1)
            .substring(0, pathname.lastIndexOf(".git") - 1);
          select.downloadUrl = "https://codeload.github.com";
        }
        const { downloadUrl, org } = select;
        loadUrl = `${downloadUrl}/${org}/zip/refs/heads`;
        loadUrl = `${loadUrl}/main`;
        prompts.next({
          type: "input",
          message: "下载路径:",
          name: "path",
          default: githubName,
        });
      }
      if (name === "branch") {
        loadUrl = `${loadUrl}/${answer}`;
        prompts.next({
          type: "input",
          message: "下载路径:",
          name: "path",
          default: githubName,
        });
      }
      if (name === "path") {
        path = answer;
        prompts.complete();
      }
    };

    const onError = (error: string) => {
      loggerError(error);
    };

    const onCompleted = () => {
      loadTpl(githubName, loadUrl, path);
    };

    inquirer.prompt(prompts).ui.process.subscribe({
      error: onError,
      complete: onCompleted,
      next: onEachAnswer,
    });

    prompts.next({
      type: "list",
      message: "请选择模板:",
      name: "name",
      choices: tplList.map((tpl: ITpl) => tpl.name),
    });
  } catch (err) {
    loggerError(`${err}`);
  }
};
