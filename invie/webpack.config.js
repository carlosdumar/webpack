const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        invie: path.resolve(__dirname, 'src/index.js')
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].js',
        publicPath: path.resolve(__dirname, 'dist')+"/",
        chunkFilename: 'js/[id].[chunkhash].js'
    },
    devServer: {
        port: 9000
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules)/,                
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015', 'react', 'stage-2']
                    }
                },
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                minimize: true,
                                modules: true,
                            }
                        }
                    ]
                })
            },
            {
                test: /\.(jpg|png|gif|woff|woff2|eot|ttf|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 100000,
                            fallback: 'file-loader',
                            name: 'images/[name].[hash].[ext]'
                        }
                    }                   
                ]
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin("css/[name].css")
    ]
}