const R = require('ramda');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');


const loaders = [
    {
        test: /\.jsx$/,
        loader: 'babel-loader',
        query: {
            presets: ['latest', 'react']
        },
    },
    {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader?mimetype=application/font-woff',
    },
    {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader?mimetype=application/font-woff',
    },
    {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader?mimetype=application/octet-stream',
    },
    {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader',
    },
    {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader?mimetype=image/svg+xml',
    },
    {
        test: /\.png(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader?mimetype=application/octet-stream',
    },
    {
        test: /\.gif(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader?mimetype=application/octet-stream',
    },
    {
        test: /\.jpe?g(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader?mimetype=application/octet-stream',
    },
    {
        test: /\.json$/,
        loader: 'json-loader',
    }
];

const prodCSSLoader = () => ({
    test: /\.scss/,
    loader: ExtractTextPlugin.extract(
        'style',
        'css!postcss!sass'
    ),
});

const devCSSLoader = () => ({
    test: /\.scss$/,
    loaders: [
        'style?sourceMap',
        'css',
        'postcss',
        'sass'
    ],
});

const CSSLoader = R.cond([
    [R.equals('production'), prodCSSLoader],
    [R.T, devCSSLoader],
]);

const addExcludeDir = R.set(R.lensProp('exclude'), /(node_modules|dist)/);

module.exports = R.append(CSSLoader(process.env.NODE_ENV), loaders)
                  .map(l => addExcludeDir(l));
