const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require('webpack')

module.exports = {
  entry: "./src/index.js",
  output: {
    publicPath: '/promo/web/',
    path: path.join(__dirname, "/dist"),
    filename: "bundle.js"
  },


  devServer: {
    host: '0.0.0.0',
    disableHostCheck: true,
    contentBase: './dist',
    historyApiFallback: true,
    compress: true,
    hot: true,
    port: 8080,
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        },
      },
      {
        test: /\.(tsx|jsx)$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env", "@babel/preset-react", "@babel/preset-typescript"],
        },
      },

      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },

      {
        test: /.scss$/,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader"
        ]
      },

      {
        test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/'
            }
          }
        ]
      },

      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
                name: '[name].[ext]',
                outputPath: 'img/'
              }
          },
        ],
      },

      {
        test: /\.htm$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'static/'
            }
          },
        ],
      },

    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      favicon: "./src/favicon.ico"
    }),

    // применять изменения только при горячей перезагрузке
    new webpack.HotModuleReplacementPlugin(),
  ]
};
