var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');

const htmlPluginObj = {
    template: './src/index.html',
    filename: './index.html'
};

module.exports = {
    entry: './src/index.tsx',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'build.js'
    },
    module: {
        rules: [
            // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
            { test: /\.tsx?$/, loader: "ts-loader" }
        ]
    },
    
    plugins: [new HtmlWebpackPlugin(htmlPluginObj)]
};



