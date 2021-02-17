const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
      main: path.resolve(__dirname, './src/js/index.js'),
    },
    devServer: {
      historyApiFallback: true,
      contentBase: path.resolve(__dirname, './dist'),
      open: true,
      compress: true,
      hot: true,
      port: 8080,
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: 'Packman online',
        template: path.resolve(__dirname, './src/index.html'), //template.html
        filename: 'index.html',
      }),
/*      new CopyWebpackPlugin({
        patterns: [
          {
            from: './src/img',
            to: './img',
          }
        ]
      }), */
      new MiniCssExtractPlugin({ filename: 'styles.css'  }),
    ],
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: ['babel-loader'],
        },
        {
          test: /\.css$/,
          use: [
             MiniCssExtractPlugin.loader,
             { loader: 'css-loader' }
          ],
        },
        {
          test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
          type: 'asset/resource',
        },
      ],
    },
    output: {
      path: path.resolve(__dirname, './dist'),
      filename: '[name].js',
    },
  mode: 'development',
}