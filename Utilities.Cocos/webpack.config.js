const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: './scripts/App/main.js',
    output: {
        path: path.resolve(__dirname, 'scripts/App'),
        filename: 'bundle.js'
    },
    optimization: {
        // We no not want to minimize our code.
        minimize: false
    }
};