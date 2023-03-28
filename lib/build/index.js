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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startWebpack = exports.devWebpack = exports.buildWebpack = void 0;
var file_1 = require("../util/file");
var webpack_1 = require("webpack");
var util_1 = require("../util");
var webpack_pro_config_1 = __importDefault(require("./webpack.pro.config"));
var ora_1 = __importDefault(require("ora"));
var webpack_dev_config_1 = require("./webpack.dev.config");
var cache_config_1 = __importDefault(require("./cache.config"));
var WebpackDevServer = require("webpack-dev-server/lib/Server");
var buildWebpack = function () {
    var rewriteConfig = (0, file_1.loadFile)((0, util_1.getCwdPath)("./cli.config.json"));
    var webpackConfig = (0, webpack_pro_config_1.default)(__assign(__assign({}, rewriteConfig), cache_config_1.default));
    // @ts-ignore
    var compiler = (0, webpack_1.webpack)(webpackConfig);
    var spinner = (0, ora_1.default)("Webpack building...");
    return new Promise(function (resolve, reject) {
        (0, util_1.loggerTiming)("WEBPACK BUILD");
        spinner.start();
        compiler.run(function (err, stats) {
            console.log(err);
            if (err) {
                if (!err.message) {
                    spinner.fail("WEBPACK BUILD FAILED!");
                    (0, util_1.loggerError)(err);
                    return reject(err);
                }
            }
        });
        spinner.succeed("WEBPACK BUILD Successful!");
        (0, util_1.loggerTiming)("WEBPACK BUILD", false);
    });
};
exports.buildWebpack = buildWebpack;
var devWebpack = function () {
    var spinner = (0, ora_1.default)("Webpack running dev ...");
    var rewriteConfig = (0, file_1.loadFile)((0, util_1.getCwdPath)("./cli.config.json"));
    var webpackConfig = (0, webpack_dev_config_1.getDevConfig)(__assign(__assign({}, rewriteConfig), cache_config_1.default));
    var compiler = (0, webpack_1.webpack)(webpackConfig);
    var devServerOptions = {
        hot: true,
        historyApiFallback: true,
        compress: true,
        open: true,
        static: "dist",
        devMiddleware: {
            stats: "errors-only",
        },
    };
    var server = new WebpackDevServer(compiler, devServerOptions);
    server.listen(8000, "127.0.0.1", function () {
        console.log("Starting server on http://localhost:8000");
    });
};
exports.devWebpack = devWebpack;
var startWebpack = function () { };
exports.startWebpack = startWebpack;
