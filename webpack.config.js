const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');
const nodeModulesPath = path.resolve(__dirname, 'node_modules');
const buildPath = path.resolve(__dirname, 'dist');
const webpack = require('webpack');
require("dotenv").config();

module.exports = {
    devtool: 'source-map',
    entry: {
        index: './src/page-index/main.js',
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/page-index/tmpl.html',
            inject: true,
            chunks: ['index'],
            filename: 'index.html'
        }),
        new webpack.DefinePlugin({
            "process.env": {
                API_KEY: JSON.stringify(process.env.API_KEY),
            },
        }),
    ],
    output: {
        filename: '[name].[contenthash].js',
        path: buildPath,
        clean: true
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
                    {
                        // Loader for webpack to process CSS with PostCSS
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [
                                    autoprefixer
                                ]
                            }
                        }
                    },
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
            {
                // https://webpack.js.org/guides/asset-modules/#replacing-inline-loader-syntax
                resourceQuery: /raw/,
                type: 'asset/source'
            },
        ],
    },
};
