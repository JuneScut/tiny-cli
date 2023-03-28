import HtmlWebpackPlugin from "html-webpack-plugin";
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
declare const getBaseConfig: ({ mode, entry, output, template }: IWebpack) => {
    mode: "development" | "production" | "none" | undefined;
    entry: any;
    target: string;
    output: any;
    module: {
        rules: ({
            test: RegExp;
            use: {
                loader: string;
                options: {
                    configFile: boolean;
                    babelrc: boolean;
                    presets: (string | (string | {
                        runtime: string;
                    })[] | (string | {
                        isTSX: boolean;
                        allExtensions: boolean;
                    })[])[];
                };
            };
            exclude: string[];
            type?: undefined;
            loader?: undefined;
            options?: undefined;
        } | {
            test: RegExp;
            use: (string | {
                loader: string;
                options: {
                    importLoaders: number;
                    postcssOptions?: undefined;
                };
            } | {
                loader: string;
                options: {
                    postcssOptions: {
                        plugins: (string | {
                            ident: string;
                        })[][];
                    };
                    importLoaders?: undefined;
                };
            })[];
            exclude?: undefined;
            type?: undefined;
            loader?: undefined;
            options?: undefined;
        } | {
            test: RegExp;
            type: string;
            use?: undefined;
            exclude?: undefined;
            loader?: undefined;
            options?: undefined;
        } | {
            test: RegExp[];
            loader: string;
            options: {
                limit: number;
                name: string;
            };
            use?: undefined;
            exclude?: undefined;
            type?: undefined;
        })[];
    };
    plugins: HtmlWebpackPlugin[];
    resolve: {
        extensions: string[];
    };
};
export default getBaseConfig;
