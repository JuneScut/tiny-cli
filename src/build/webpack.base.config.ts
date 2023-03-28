import { getCwdPath } from "../util";
import HtmlWebpackPlugin from "html-webpack-plugin";
import babelConfig from "./babel.config";

interface IWebpack {
  mode?: "development" | "production" | "none";
  entry: any;
  output: any;
  template: string;
  publicPath?: string;
  cssLoader?: any;
  devServer?: DevServer;
  plugins?: any;
}

const getBaseConfig = ({ mode, entry, output, template }: IWebpack) => {
  console.log(getCwdPath("babel-loader"));
  console.log(getCwdPath("./node_modules"));
  return {
    mode,
    entry,
    target: "web",
    output,
    module: {
      rules: [
        {
          test: /\.(js|jsx|ts|tsx)$/,
          use: babelConfig,
          exclude: [
            getCwdPath("./node_modules"), // 由于 node_modules 都是编译过的文件，这里做过滤处理
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
      new HtmlWebpackPlugin({
        template,
        filename: "index.html",
      }),
    ],
    resolve: {
      extensions: [".ts", ".tsx", ".js", ".json"],
    },
  };
};

export default getBaseConfig;
