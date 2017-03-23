const R = require('ramda');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const loaders = [
    {
        test: /\.jsx$/, loader: 'babel-loader', query: {
        presets: [ 'latest', 'react' ],
    },
    }, {
        test: /\.(eot|svg|ttf|woff(2)?)(\?v=\d+\.\d+\.\d+)?/,
        loader: 'file-loader',
    }, {
        test: /\.(png|gif|jp(e)?g)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader?mimetype=application/octet-stream',
    }, {
        test: /\.json$/, loader: 'json-loader',
    },
    {
        test: /\.scss/,
        loader: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
                'css-loader',
                'postcss-loader',
                'sass-loader?includePaths[]="' + path.resolve(
                    __dirname,
                    './node_modules/compass-mixins/lib'
                ) + '"',
            ],
        }),
    },
];

const addExcludeDir = R.set(R.lensProp('exclude'), /dist/);

module.exports = loaders.map(l => addExcludeDir(l));
