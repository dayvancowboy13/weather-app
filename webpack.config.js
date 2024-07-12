const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: "development",
  devtool: 'inline-source-map',
  devServer: {
    static: './dist',
    watchFiles: ['./src/*.html'],
    hot: true
  },
  optimization: {
    runtimeChunk: 'single'
  },
  entry: './src/index.js',
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/template.html',
      filename: './index.html'
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
};