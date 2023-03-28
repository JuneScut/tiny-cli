"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var webpack_base_config_1 = __importDefault(require("./webpack.base.config"));
var util_1 = require("../util");
var mini_css_extract_plugin_1 = __importDefault(require("mini-css-extract-plugin"));
var getProConfig = function (config) {
    var entry = config.entry, template = config.template, publicPath = config.publicPath, output = config.output, cssLoader = config.cssLoader, plugins = config.plugins, rest = __rest(config, ["entry", "template", "publicPath", "output", "cssLoader", "plugins"]);
    return __assign(__assign(__assign({}, (0, webpack_base_config_1.default)({
        mode: "production",
        entry: {
            app: (0, util_1.getCwdPath)((entry === null || entry === void 0 ? void 0 : entry.app) || "./src/index.js"),
        },
        // output: {
        //   filename: output?.filename || "build.js",
        //   path: getCwdPath(output?.path || "./dist"), // 打包好之后的输出路径
        // },
        output: {
            chunkFilename: (output === null || output === void 0 ? void 0 : output.chunkFilename) || "static/js/[name].[contenthash].js",
            filename: (output === null || output === void 0 ? void 0 : output.filename) || "static/js/[name].[contenthash].js",
            path: (0, util_1.getCwdPath)((output === null || output === void 0 ? void 0 : output.path) || "./dist"), // 打包好之后的输出路径
        },
        template: (0, util_1.getCwdPath)(template || "public/index.html"),
        plugins: [
            new mini_css_extract_plugin_1.default({
                filename: "[name].[contenthash].css",
                chunkFilename: "[id].[contenthash].css",
                ignoreOrder: true,
            }),
        ],
    })), { optimization: {
            splitChunks: {
                cacheGroups: {
                    commons: {
                        test: /[\\/]node_modules[\\/]/,
                        name: "vendors",
                        chunks: "all",
                    },
                },
            },
        } }), rest);
};
exports.default = getProConfig;
