const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    index: './src/index.tsx',
    serv: { import: './src/serv/serv.ts', filename: '../serv.js' },
  },
  
  output: {
    path: path.resolve(__dirname, 'dist', 'public'),
    filename: '[name].[contenthash].js',
  },

  optimization: {
    moduleIds: 'deterministic',
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },

  devtool: 'inline-source-map',

  devServer: {
    contentBase: './dist/public',
  },

  plugins: [
    //new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./index.html",
      excludeChunks: [ 'serv' ]
    }),
  ],

  resolve: {
    extensions: [".ts", ".tsx", ".js", ".png"]
  },
  
  module:{
	  rules:[
      {
      test: /\.tsx?$/,
      use: [
        {
          loader: 'ts-loader',  
        }, 
      ],
      exclude: '/node_modules/'
    },

	  {
		  test:/\.css$/i,
		  use:['style-loader', 'css-loader'],
	  },
	  {
		  test: /\.(png|svg|jpg|jpeg|gif)/i,
      loader: 'file-loader',
      options: {
        name: '[name].[ext]',
      },
	  },
	  {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        loader: 'file-loader',
      options: {
        name: '[name].[ext]',
      },
      },
      {
        test: /\.(ts|tsx)$/,
        enforce: 'pre',
        use: [
          {
            options: {
              eslintPath: require.resolve('eslint'),
    
            },
            loader: require.resolve('eslint-loader'),
          },
        ],
        exclude: /node_modules/,
      },
	  ],
  },
};