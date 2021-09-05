const path = require('path');
//const { BaseHrefWebpackPlugin } = require("base-href-webpack-plugin");

module.exports = {
  entry: './src/index.tsx', // relative path
  output: {
    path: path.join(__dirname, 'public'), // absolute path
    filename: 'bundle.js', // file name
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
            options: { transpileOnly: true },
          },
        ],
      },
      {
        //  Unmoduled SCSS
        test: /\.s[ac]ss$/i,
        exclude: [/\.module.(s(a|c)ss)$/, /node_modules/],
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
      //  module SCSS
      {
        test: /\.module\.s[ac]ss$/i,
        exclude: [/node_modules/],
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[local]—[hash:base64:5]',
              },
              // localsConvention: 'camelCase',
              sourceMap: true,
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.min.css$/i,
        exclude: [/node_modules/],
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[local]—[hash:base64:5]',
              },
              // localsConvention: 'camelCase',
              sourceMap: true,
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      // {
      //   test: /\.css$/i,
      //   exclude: [/node_modules/],
      //   use: [
      //     'style-loader',
      //     {
      //       loader: 'css-loader',
      //       options: {
      //         modules: {
      //           localIdentName: '[local]—[hash:base64:5]',
      //         },
      //         // localsConvention: 'camelCase',
      //         sourceMap: true,
      //       },
      //     },
      //     'sass-loader',
      //   ],
      // },
      //fonts
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        loader: 'file-loader',
        options: {
          outputPath: '../fonts',
        },
      },
      {
        test: /\.(png|jp(e*)g|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8000, // Convert images < 8kb to base64 strings
              name: 'images/[hash]-[name].[ext]',
            },
          },
        ],
      },
    ],
  },
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    historyApiFallback: true,
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },
  node: {
    fs: 'empty',
  },
  // externals: ['react-dom', 'react-router-dom'],
};
