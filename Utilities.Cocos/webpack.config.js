const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: path.join(__dirname, 'wwwroot/scripts/app.ts'),
    devtool: 'inline-source-map',
    watch: true,
    watchOptions: {
        ignored: /node_modules/
    },
    output: {
        path: path.resolve(__dirname, '/wwwroot/scripts/'),
        filename: 'cocosbundle.js'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
            },
        ]
    },
    optimization: {
        // We no not want to minimize our code.
        minimize: false
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"]
    }
};