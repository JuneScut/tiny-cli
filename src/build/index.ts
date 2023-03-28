import { loadFile } from "../util/file";
import { webpack } from "webpack";

import { getCwdPath, loggerError, loggerTiming } from "../util";
import getProConfig from "./webpack.pro.config";
import ora from "ora";
import { getDevConfig } from "./webpack.dev.config";
import cacheConfig from "./cache.config";
const WebpackDevServer = require("webpack-dev-server/lib/Server");

export const buildWebpack = () => {
  const rewriteConfig: any = loadFile(getCwdPath("./cli.config.json"));

  const webpackConfig = getProConfig({
    ...rewriteConfig,
    ...cacheConfig,
  });

  // @ts-ignore
  const compiler = webpack(webpackConfig);
  const spinner = ora("Webpack building...");

  return new Promise((resolve, reject) => {
    loggerTiming("WEBPACK BUILD");
    spinner.start();
    compiler.run((err: any, stats: any) => {
      console.log(err);
      if (err) {
        if (!err.message) {
          spinner.fail("WEBPACK BUILD FAILED!");
          loggerError(err);
          return reject(err);
        }
      }
    });

    spinner.succeed("WEBPACK BUILD Successful!");
    loggerTiming("WEBPACK BUILD", false);
  });
};

export const devWebpack = () => {
  const spinner = ora("Webpack running dev ...");

  const rewriteConfig: any = loadFile(getCwdPath("./cli.config.json"));
  const webpackConfig = getDevConfig({
    ...rewriteConfig,
    ...cacheConfig,
  });

  const compiler = webpack(webpackConfig);

  const devServerOptions = {
    hot: true,
    historyApiFallback: true,
    compress: true,
    open: true,
    static: "dist",
    devMiddleware: {
      stats: "errors-only",
    },
  };

  const server = new WebpackDevServer(compiler, devServerOptions);

  server.listen(8000, "127.0.0.1", () => {
    console.log("Starting server on http://localhost:8000");
  });
};

export const startWebpack = () => {};
