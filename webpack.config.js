"use strict";

const path = require('path');
const R = require('ramda');

const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackCleanupPlugin = require('webpack-cleanup-plugin');

const loaders = require('./webpack.loaders');
const pack = require('./package.json');

const HOST = process.env.HOST || '127.0.0.1';
const PORT = process.env.PORT || '8080';

const entryPoint = path.resolve('./src/index.jsx');

const buildPath = path.join(__dirname, 'dist');
const template = './src/index.html';
const appTitle = `${pack.description}  v${pack.version}`;
const cssFileName = 'style.css';

const output = {
    path: buildPath,
    filename: '[name].[hash].js',
    chunkFilename: '[hash].[id].js',
    pathinfo: true
};

const mkPath = () => R.curry(path.resolve);

const uglifyOptions = {
    compress: {
        warnings: false,
        screw_ie8: true,
        drop_console: true,
        drop_debugger: true,
        dead_code: true,
        loops: true,
        passes: 5
    },
    minimize: true
};

const resolve = {
    extensions: ['.js', '.jsx']
};

const htmlWebpackPluginOptions = {
    title: appTitle,
    template: template,
    xhtml: true,
    inject: 'body',
    environment: process.env.NODE_ENV,
    version: pack.version
};

const devConfig = () => ({
    entry: [
        entryPoint,
    ],
    devtool: 'eval',
    output,
    resolve,
    module: {
        loaders: loaders
    },
    devServer: {
        contentBase: buildPath,
        noInfo: true,
        hot: true,
        inline: true,
        historyApiFallback: true,
        port: PORT,
        host: HOST
    },
    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin(htmlWebpackPluginOptions)
    ],
});

const prodConfig = () => ({
    entry: [
        entryPoint,
    ],
    output,
    resolve,
    module: {
        loaders
    },
    plugins: [
        new webpack.DefinePlugin({
                                     'process.env': {
                                         NODE_ENV: JSON.stringify('production')
                                     }
                                 }),
        new WebpackCleanupPlugin(),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new ExtractTextPlugin(cssFileName, {
            allChunks: true,
        }),
        new webpack.optimize.UglifyJsPlugin(uglifyOptions),
        new HtmlWebpackPlugin(htmlWebpackPluginOptions),
        new webpack.optimize.CommonsChunkPlugin('shared.js')
    ]
});

const conf = R.ifElse(
  R.equals('production'),
  prodConfig,
  devConfig
);

const config = conf(process.env.NODE_ENV);
console.log(JSON.stringify(config));
module.exports = config;
