const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const nodeModulesPath = path.resolve(__dirname, 'node_modules');

module.exports = {
    entry: {
        index: './src/index.js',
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        }),
    ],
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [
                    // Creates `style` nodes from JS strings
                    "style-loader",
                    // Translates CSS into CommonJS
                    "css-loader",
                    "resolve-url-loader",
                    // Compiles Sass to CSS
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: true,
                            sassOptions: {
                                indentWidth: 4,
                                includePaths: [nodeModulesPath],
                            },
                        },
                    },
                ],
            },
        ],
    },
};
