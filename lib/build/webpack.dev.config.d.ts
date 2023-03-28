import { Configuration as webpackConfiguration } from "webpack";
import { Configuration as WebpackDevServerConfiguration } from "webpack-dev-server";
interface Configuration extends webpackConfiguration {
    devServer?: WebpackDevServerConfiguration;
}
interface IDevWebpackConfig extends Configuration {
    entry?: {
        app?: string;
    };
    output?: {
        chunkFilename: string;
        filename: string;
        path: string;
    };
    template?: string;
    injectionEnvironment?: {
        [key: string]: string;
    };
    publicPath?: string;
    cssLoader?: any;
    devServer?: DevServer;
    plugins?: any;
}
export declare const getDevConfig: (config: IDevWebpackConfig) => Configuration;
export {};
