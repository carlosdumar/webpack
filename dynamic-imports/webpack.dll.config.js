const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    entry: {
        modules: [
            'react',
            'react-dom'
        ],
        
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        library: '[name]'
    },
    // module: {
    //     rules: [
    //         {
    //             test: /\.js$/,
    //             use: {
    //                 loader: 'babel-loader',
    //                 options: {
    //                     presets: ['es2015', 'react']
    //                 }
    //             },
    //         },
    //         {
    //             test: /\.json$/,
    //             use: 'json-loader'
    //         },
    //         {
    //             test: /\.css$/,
    //             use: ExtractTextPlugin.extract({
    //                 use: [
    //                     {
    //                         loader: 'css-loader',
    //                         options: {
    //                             modules: true,
    //                             importLoaders: 1
    //                         }
    //                     },
    //                     'postcss-loader'
    //                 ]                   
    //             }),
    //         },
    //         {
    //             test: /\.styl$/,
    //             use: ExtractTextPlugin.extract({
    //                 use: [
    //                     "css-loader",
    //                     {
    //                         loader: 'stylus-loader',
    //                         options: {
    //                             use: [
    //                                 require('nib'),
    //                                 require('rupture')
    //                             ],
    //                             import: [
    //                                 '~nib/lib/nib/index.styl',
    //                                 '~rupture/rupture/index.styl'
    //                             ]
    //                         }
    //                     }
    //                 ]                   
    //             }),
    //         },
    //         {
    //             test: /\.scss$/,
    //             use: ExtractTextPlugin.extract({
    //                 use: ["css-loader","sass-loader"]                   
    //             }),
    //         },
    //         {
    //             test: /\.(jpg|png|gif|woff|woff2|eot|ttf|svg)$/,
    //             use: [
    //                 {
    //                     loader: 'url-loader',
    //                     options: {
    //                         limit: 100000
    //                     }
    //                 }                   
    //             ]
    //         }
    //     ]
    // },
    plugins: [
        // new ExtractTextPlugin("css/[name].css"),
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'vendor',
        //     minChunks: Infinity,
        // })
        new webpack.DllPlugin({
            name: "[name]",
            path: path.join(__dirname, "[name]-manifest.json")
        })
    ]
}
