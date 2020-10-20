const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require('terser-webpack-plugin')
module.exports = {
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname, 'Templates'),
        filename: 'BundleScript.txt'
    },
    optimization: {
      minimizer: [
        new TerserPlugin({
          test: /BundleScript.txt$/,
          extractComments: false,
          terserOptions: {
            compress: { drop_console: true },
          }
        })
      ],
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                }
            },
            {
              test: /\.(sa|sc|c)ss$/,
              use: [
                MiniCssExtractPlugin.loader,
                {
                  loader: 'css-loader'
                },
                {
                  loader: 'sass-loader'
                }
              ]
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({ filename: 'BundleStyle.txt' })
    ]
}