"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadTpl = exports.getTplList = exports.updateTpl = void 0;
var file_1 = require("../util/file");
var util_1 = require("../util");
var download_git_repo_1 = __importDefault(require("download-git-repo"));
var cacheTpl = (0, util_1.getDirPath)("../cacheTpl");
// 更新用户可选择的模板文件列表
var updateTpl = function (tplUrl, name, desc) { return __awaiter(void 0, void 0, void 0, function () {
    var tplConfig, file, isExist;
    return __generator(this, function (_a) {
        // 判断当前是否存在 tpl 的缓存文件，如果已存在缓存文件，那么需要跟当前的模板信息合并，如果不存在的话则需要创建文件，将获取的信息保存进去。
        try {
            tplConfig = (0, file_1.loadFile)("".concat(cacheTpl, "/.tpl.json"));
            file = [
                {
                    tplUrl: tplUrl,
                    name: name,
                    desc: desc,
                },
            ];
            if (tplConfig) {
                isExist = tplConfig.some(function (tpl) { return tpl.name === name; });
                if (isExist) {
                    file = tplConfig.map(function (tpl) {
                        if (tpl.name === name) {
                            return {
                                tplUrl: tplUrl,
                                name: name,
                                desc: desc,
                            };
                        }
                        return tpl;
                    });
                }
                else {
                    file = __spreadArray(__spreadArray([], tplConfig, true), file, true);
                }
            }
            (0, file_1.writeFile)(cacheTpl, ".tpl.json", file);
            (0, util_1.loggerSuccess)("Add Template Successful!");
        }
        catch (error) {
            (0, util_1.loggerError)("".concat(error));
        }
        return [2 /*return*/];
    });
}); };
exports.updateTpl = updateTpl;
var getTplList = function () {
    try {
        var tplConfig = (0, file_1.loadFile)("".concat(cacheTpl, "/.tpl.json"));
        if (tplConfig) {
            return tplConfig;
        }
        else {
            (0, util_1.loggerWarring)("No template! Please add template first!");
            process.exit(1);
        }
    }
    catch (err) {
        (0, util_1.loggerError)("".concat(err));
    }
};
exports.getTplList = getTplList;
var loadTpl = function (name, tplUrl, path) {
    // git(tplUrl, getCwdPath(`./${path}`), (err: string) => {
    //   if (err) {
    //     loggerError(err);
    //   } else {
    //     loggerSuccess(`Download ${name} Template Successful!`);
    //   }
    // });
    // 拼接路径，但只能下载文件，不会把 .git 也拉下来.只是一个轻量级的工具
    (0, download_git_repo_1.default)("direct:".concat(tplUrl), (0, util_1.getCwdPath)("./".concat(path)), function (err) {
        if (err) {
            (0, util_1.loggerError)(err);
        }
        else {
            (0, util_1.loggerSuccess)("Download ".concat(name, " Template Successful!"));
        }
    });
};
exports.loadTpl = loadTpl;
