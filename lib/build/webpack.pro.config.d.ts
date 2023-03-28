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
declare const getProConfig: (config: IWebpackConfig) => {
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: RegExp;
                    name: string;
                    chunks: string;
                };
            };
        };
    };
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
    plugins: import("html-webpack-plugin")[];
    resolve: {
        extensions: string[];
    };
};
export default getProConfig;
