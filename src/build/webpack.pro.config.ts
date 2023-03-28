import getBaseConfig from "./webpack.base.config";
import { getCwdPath } from "../util";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

interface IWebpackConfig {
  entry?: {
    app?: string;
  };
  output?: {
    chunkFilename: string;
    filename: string;
    path: string;
  };
  template?: string;
  publicPath?: string;
  cssLoader?: any;
  plugins?: any;
}

const getProConfig = (config: IWebpackConfig) => {
  const { entry, template, publicPath, output, cssLoader, plugins, ...rest } =
    config;

  return {
    ...getBaseConfig({
      mode: "production",
      entry: {
        app: getCwdPath(entry?.app || "./src/index.js"),
      },
      // output: {
      //   filename: output?.filename || "build.js",
      //   path: getCwdPath(output?.path || "./dist"), // 打包好之后的输出路径
      // },
      output: {
        chunkFilename:
          output?.chunkFilename || "static/js/[name].[contenthash].js",
        filename: output?.filename || "static/js/[name].[contenthash].js",
        path: getCwdPath(output?.path || "./dist"), // 打包好之后的输出路径
      },
      template: getCwdPath(template || "public/index.html"),
      plugins: [
        new MiniCssExtractPlugin({
          filename: "[name].[contenthash].css",
          chunkFilename: "[id].[contenthash].css",
          ignoreOrder: true,
        }),
      ],
    }),
    optimization: {
      splitChunks: {
        cacheGroups: {
          commons: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendors",
            chunks: "all",
          },
        },
      },
    },
    ...rest,
  };
};

export default getProConfig;
