#!/usr/bin/env node

import { selectTpl } from "./../inquirer/tpl";
import { addTpl } from "../inquirer/tpl";
import { Command } from "commander";
const program = new Command();

import { getEslint } from "../eslint";
import { buildWebpack, devWebpack } from "../build";
import { getArgvMap } from "../util/argv";

program
  .version("0.1.0")
  .description("start eslint and fix code")
  .command("eslint")
  .action((value) => {
    getEslint();
  });

program
  .version("0.1.0")
  .description("webpack")
  .command("webpack")
  .action((value) => {
    const argvs = getArgvMap();
    const env = argvs.get("NODE_ENV");
    if (env == "development") {
      devWebpack();
    } else {
      buildWebpack();
    }
  });

program
  .version("0.1.0")
  .description("add tpl")
  .command("add tpl")
  .action((value) => {
    addTpl();
  });

program
  .version("0.1.0")
  .description("init tpl")
  .command("init tpl")
  .action((value) => {
    selectTpl();
  });

program.parse(process.argv);
