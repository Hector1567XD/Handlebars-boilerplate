const path = require('path');

// Plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: {
    app: './src/app.js',
    home: './src/js/home.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name]-bundle.js',
  },
  plugins:[
    new HtmlWebpackPlugin({
      template: './src/view/homepage.handlebars',
      filename: 'home.html',
      chunks: ['app','home']
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name]-styles.css',
    })
  ],
  module:{
    rules:[
      {
        test: /\.(sa|sc|c)ss$/,
        use:[
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.handlebars$/,
        loader: 'handlebars-loader'
      },
      {
        test: /\.(jpg|png|gif|svg|jpeg)$/,
        use: [
          {
            loader:'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'static/images',
              useRelativePath: true,
            }
          }
        ]
      },
      {
        test: /\.(ttf|otf|woff2)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'static/fonts',
              publicPath: '../static/fonts',
              useRelativePath: false
            }
          }
        ]
      },
      {
        loader: 'image-webpack-loader', // Minificador de imagenes
        options: {
          mozjpeg: {
            progressive: true,
            quality: 65
          },
          // optipng.enabled: false will disable optipng
          optipng: {
            enabled: true,
          },
          pngquant: {
            quality: [0.65, 0.90],
            speed: 4
          },
          gifsicle: {
            interlaced: false,
          },
          // the webp option will enable WEBP
          webp: {
            quality: 75
          }
        }
      }
    ]
  }
};
