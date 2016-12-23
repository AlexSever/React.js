var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');

module.exports = {
    devtool: debug ? "inline-sourcemap" : null,
    entry: "./app/app.jsx",
    resolve: {
        root: __dirname,
        alias: {
        },
        extensions: ["",".js",".jsx"]
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015', 'stage-0']
                }
            },
            {
                test: /\.css$/,
                loader: "style-loader!css-loader",
                exclude: [/node_modules/, /public/]
            }
        ]
    },
    output: {
        path: __dirname + '/public/',
        filename: "bundle.js"
    },
    plugins: debug ? [] : [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
    ]
};