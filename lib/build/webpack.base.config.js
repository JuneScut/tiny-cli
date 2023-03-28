"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("../util");
var html_webpack_plugin_1 = __importDefault(require("html-webpack-plugin"));
var babel_config_1 = __importDefault(require("./babel.config"));
var getBaseConfig = function (_a) {
    var mode = _a.mode, entry = _a.entry, output = _a.output, template = _a.template;
    console.log((0, util_1.getCwdPath)("babel-loader"));
    console.log((0, util_1.getCwdPath)("./node_modules"));
    return {
        mode: mode,
        entry: entry,
        target: "web",
        output: output,
        module: {
            rules: [
                {
                    test: /\.(js|jsx|ts|tsx)$/,
                    use: babel_config_1.default,
                    exclude: [
                        (0, util_1.getCwdPath)("./node_modules"), // 由于 node_modules 都是编译过的文件，这里做过滤处理
                    ],
                },
                {
                    test: /\.css$/,
                    use: [
                        "style-loader",
                        {
                            loader: "css-loader",
                            options: {
                                importLoaders: 1,
                            },
                        },
                        {
                            loader: "postcss-loader",
                            options: {
                                postcssOptions: {
                                    plugins: [
                                        [
                                            "postcss-preset-env",
                                            {
                                                ident: "postcss",
                                            },
                                        ],
                                    ],
                                },
                            },
                        },
                    ],
                },
                {
                    test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
                    type: "asset/inline",
                },
                {
                    test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                    loader: "url-loader",
                    options: {
                        limit: 10000,
                        name: "static/media/[name].[hash:8].[ext]",
                    },
                },
            ],
        },
        plugins: [
            new html_webpack_plugin_1.default({
                template: template,
                filename: "index.html",
            }),
        ],
        resolve: {
            extensions: [".ts", ".tsx", ".js", ".json"],
        },
    };
};
exports.default = getBaseConfig;
