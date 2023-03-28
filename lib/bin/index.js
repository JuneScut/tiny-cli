#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tpl_1 = require("./../inquirer/tpl");
var tpl_2 = require("../inquirer/tpl");
var commander_1 = require("commander");
var program = new commander_1.Command();
var eslint_1 = require("../eslint");
var build_1 = require("../build");
var argv_1 = require("../util/argv");
program
    .version("0.1.0")
    .description("start eslint and fix code")
    .command("eslint")
    .action(function (value) {
    (0, eslint_1.getEslint)();
});
program
    .version("0.1.0")
    .description("webpack")
    .command("webpack")
    .action(function (value) {
    var argvs = (0, argv_1.getArgvMap)();
    var env = argvs.get("NODE_ENV");
    if (env == "development") {
        (0, build_1.devWebpack)();
    }
    else {
        (0, build_1.buildWebpack)();
    }
});
program
    .version("0.1.0")
    .description("add tpl")
    .command("add tpl")
    .action(function (value) {
    (0, tpl_2.addTpl)();
});
program
    .version("0.1.0")
    .description("init tpl")
    .command("init tpl")
    .action(function (value) {
    (0, tpl_1.selectTpl)();
});
program.parse(process.argv);
