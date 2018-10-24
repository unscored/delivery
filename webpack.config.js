const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const path = require("path");

const devEnvironment = require('./config/dev.json');
const prodEnvironment = require('./config/prod.json');


const nodeEnv = process.env.NODE_ENV ? 'production' : 'development';
const devMode = nodeEnv !== 'production';
const jsonEnvironment = devMode ? devEnvironment : prodEnvironment;

const CONSTANTS = {
  OUTPUT_PATH: 'public',
  ENTRY_CLIENT_PATH: 'client',
  ENTRY_ADMIN_PATH: 'admin',
};
const htmlPlugin = new HtmlWebPackPlugin({
  template: path.join(__dirname, CONSTANTS.ENTRY_CLIENT_PATH, 'index.html'),
  favicon: path.join(__dirname, CONSTANTS.ENTRY_CLIENT_PATH, 'favicon.ico'),
  filename: "./index.html"
});
const miniCssPlugin = new MiniCssExtractPlugin({
  filename: "[name]-[hash:8].css",
  chunkFilename: "[id]-[hash:8].css"
});
const uglifyJs = new UglifyJsPlugin({
  cache: true,
  parallel: true,
  sourceMap: true // set to true if you want JS source maps
});
const definePlugin = new webpack.DefinePlugin({
  'process.env': { NODE_ENV: JSON.stringify(process.env.NODE_ENV) },
  $__WebPackConfig: JSON.stringify(jsonEnvironment),
});
const cleanPlugin = new CleanWebpackPlugin([CONSTANTS.OUTPUT_PATH]);
const optimizeCSS = new OptimizeCSSAssetsPlugin({});

module.exports = {
  mode: process.env.NODE_ENV || 'development',
  entry: path.join(__dirname, CONSTANTS.ENTRY_CLIENT_PATH),
  output: {
    path: path.join(__dirname, CONSTANTS.OUTPUT_PATH),
    filename: 'main-[hash:8].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: { loader: "babel-loader" }
      },
      {
        test: /\.(css|scss)$/,
        use: [
          { loader: devMode ? "style-loader" : MiniCssExtractPlugin.loader },
          {
            loader: "css-loader",
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: "[name]_[local]_[hash:8]",
              sourceMap: true,
              minimize: true
            }
          },
          { loader: "sass-loader" }
        ]
      },
      {
        test: /\.(jpg|jpeg|png|gif|ico)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]',
              context: CONSTANTS.ENTRY_CLIENT_PATH
            }
          }
        ]
      },
      {
        test: /.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[path][name].[ext]",
            context: CONSTANTS.ENTRY_CLIENT_PATH
          }
        }
      }
    ]
  },
  devServer: {
    historyApiFallback: true
  },
  optimization: {
    minimizer: [
      uglifyJs,
      optimizeCSS,
    ]
  },
  plugins: [
    htmlPlugin,
    miniCssPlugin,
    cleanPlugin,
    definePlugin
  ]
};