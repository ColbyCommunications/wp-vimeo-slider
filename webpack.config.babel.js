import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';

import packageJson from './package.json';

const main = () => {
  const entry = {
    [packageJson.name]: ['./demo/src/index.js'],
  };
  const filename = `[name].js`;

  return {
    entry,
    output: {
      filename,
      path: path.resolve(__dirname, 'demo'),
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: path.resolve(__dirname, 'demo/index.html'),
        template: 'demo/src/index.html',
      }),
    ],
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              babelrc: true,
            },
          },
        },
      ],
    },
    devServer: {
      open: true,
      openPage: 'wp-vimeo-slider/',
      publicPath: '/wp-vimeo-slider/',
    },
    devtool: 'source-maps',
  };
};

export default main;
