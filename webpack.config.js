const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const autoprefixer = require("autoprefixer");
const webpack = require("webpack");
const path = require("path");

const devEnvironment = require('./config/dev.json');
const prodEnvironment = require('./config/prod.json');


const CONSTANTS = {
  OUTPUT_PATH: 'public',
  ENTRY_CLIENT_PATH: 'client',
  ENTRY_ADMIN_PATH: 'admin',
};

const isAdmin = !!process.env.IS_ADMIN;
const targetOutputPath = isAdmin ? `${CONSTANTS.OUTPUT_PATH}/${CONSTANTS.ENTRY_ADMIN_PATH}` : CONSTANTS.OUTPUT_PATH;
const targetEntryPath = isAdmin ? CONSTANTS.ENTRY_ADMIN_PATH : CONSTANTS.ENTRY_CLIENT_PATH;
const nodeEnv = process.env.NODE_ENV;
const devMode = nodeEnv !== 'production';
const jsonEnvironment = devMode ? devEnvironment : prodEnvironment;
const htmlPlugin = new HtmlWebPackPlugin({
  template: path.join(__dirname, targetEntryPath, 'index.html'),
  favicon: path.join(__dirname, targetEntryPath, 'favicon.ico'),
  inject: 'body',
  filename: "./index.html"
});
const miniCssPlugin = new MiniCssExtractPlugin({
  filename: "[name]-[hash:8].css",
  chunkFilename: "[id]-[hash:8].css"
});
const definePlugin = new webpack.DefinePlugin({
  'process.env': { NODE_ENV: JSON.stringify(process.env.NODE_ENV) },
  $__WebPackConfig: JSON.stringify(jsonEnvironment),
});
const cleanPlugin = new CleanWebpackPlugin([CONSTANTS.OUTPUT_PATH]);
const copyPlugin = new CopyWebpackPlugin([{ from: path.resolve(__dirname, 'client', 'assets', 'static'), to: '' }]);
const optimizeCSS = new OptimizeCSSAssetsPlugin({});
const loaderOptionsPlugin = new webpack.LoaderOptionsPlugin({
  options: {
    postcss: [
      autoprefixer()
    ]
  }
});
const targetOutput = {
  path: path.join(__dirname, targetOutputPath),
  filename: 'main-[hash:8].js'
};
const plugins = [
  htmlPlugin,
  miniCssPlugin,
  definePlugin,
  loaderOptionsPlugin
];

if (!isAdmin && !devMode) {
  plugins.push(cleanPlugin);
  plugins.push(copyPlugin);
}
if (devMode) targetOutput.publicPath = '/';
if (!devMode && isAdmin) targetOutput.publicPath = '/admin';

console.log(devMode, targetOutput);

module.exports = {
  mode: process.env.NODE_ENV || 'development',
  entry: path.join(__dirname, targetEntryPath),
  output: targetOutput,
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: { loader: "babel-loader" }
      },
      {
        test: /\.scss$/,
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
          { loader: 'postcss-loader' },
          { loader: "sass-loader" }
        ]
      },
      {
        test: /\.css$/,
        use: [
          { loader: devMode ? "style-loader" : MiniCssExtractPlugin.loader },
          { loader: "css-loader" }
        ]
      },
      {
        test: /\.less$/,
        use: [
          { loader: devMode ? "style-loader" : MiniCssExtractPlugin.loader },
          { loader: "css-loader" },
          {
            loader: "less-loader",
            options: {
              javascriptEnabled: true
            }
          },
        ]
      },
      {
        test: /\.(jpg|jpeg|png|gif|ico)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]',
              context: targetEntryPath
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
            context: targetEntryPath
          }
        }
      }
    ]
  },
  devServer: {
    historyApiFallback: true,
  },
  optimization: {
    splitChunks: {
			chunks: 'all',
			minChunks: 2,
			name: 'vendor'
		},
    minimizer: [
      new TerserPlugin({ sourceMap: true }),
      optimizeCSS,
    ]
  },
  plugins
};