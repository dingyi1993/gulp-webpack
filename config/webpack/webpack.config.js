// module.exports = {
//     entry: {
//         index: '../../src/js/index.js'
//     },
//     output: {
//         path: '../../dist/js/',
//         filename: '[name].js'
//     }
// };
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');

// process.env.NODE_ENV = 'production';
process.env.NODE_ENV = 'development';

module.exports = {
    entry: {
        // bpp: './src/bpp.js',
        // app: ['./src/app.js', './src/cpp.js'],
        // dpp: './src/dpp.js',
        index: '../../src/index.js',
        index2: '../../src/index2.js',
        index3: '../../src/index3.js',
    },
    output: {
        path: '../../dist',
        filename: '[name].bundle.js',
        // publicPath: '/assets'
    },
    devtool: 'source-map',
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel'
            },
            {
                test: /\.css$/,
                // loader: 'style!css'
                loader: ExtractTextPlugin.extract("style", "css")
            },
            {
                test: /\.scss$/,
                // loader: 'style!css!sass'
                loader: ExtractTextPlugin.extract("style", "css", "sass")
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            __DEV__: JSON.stringify(JSON.parse(process.env.NODE_ENV === 'development' || 'false')),
            __PROD__: JSON.stringify(JSON.parse(process.env.NODE_ENV === 'production' || 'false'))
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'lib',
            filename: 'lib.js',
            // minChunks: function(module, count) {
            //     console.log(module.resource, count)
            //     // if (count >= 3) {
            //     //     return true;
            //     // }
            //     // return false;
            //      return (
            //         module.resource &&
            //         /\.js$/.test(module.resource) &&
            //         module.resource.indexOf(path.join(__dirname, './node_modules')) === 0
            //     )
            // }
            // chunks: ['index', 'index2', 'index3'],
            // minChunks: 3
        }),
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'common_a_b',
        //     filename: 'common_a_b.js',
        //     chunks: ['index', 'index2'],
        //     // minChunks: 2
        // }),
        // new webpack.optimize.CommonsChunkPlugin('common_a_b', ['index', 'index1']),
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'manifest',
        //     filename: 'manifest.js',
        //     chunks: ['lib', 'common_a_b']
        // }),
        // new ExtractTextPlugin('css/[name].css?[hash]-[chunkhash]-[contenthash]-[name]'),
        new ExtractTextPlugin('css/[name].css'),
        // new ExtractTextPlugin('css/style.css', {allChunks: true}),
        new webpack.ProvidePlugin({
            "$": "jquery",
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: '../../index.html',
            chunks: ['lib', 'index'],
            inject: true
        }),
        new HtmlWebpackPlugin({
            filename: 'index2.html',
            template: '../../index2.html',
            chunks: ['lib', 'index2'],
            inject: true
        }),
        new HtmlWebpackPlugin({
            filename: 'index3.html',
            template: '../../index3.html',
            chunks: ['lib', 'index3'],
            inject: true
        })

        // new webpack.optimize.OccurenceOrderPlugin(),
        // new webpack.HotModuleReplacementPlugin(),
        // new webpack.NoErrorsPlugin(),
    ]
};
