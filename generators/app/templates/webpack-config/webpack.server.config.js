var path = require('path');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var nodeExternals = require('webpack-node-externals');
var webpack = require('webpack');
var merge = require('lodash.merge');
var config = require('../src/config/general.js');
var BaseConfig = require('./webpack.base.config');

 ServerTemplate = {

	entry: ['babel-polyfill', './src/server.js'],
	output: {
		publicPath: config.basePath,
		path: path.join(__dirname, '../build/public'),
		filename: '../server.js'
	},
	target: 'node',
	node: {
		__dirname: false,
		__filename: false
	},
	plugins: [
		new MiniCssExtractPlugin({filename: 'style.css'}),
		new CopyWebpackPlugin([{from: 'src/public', to: '.'}]),
		new webpack.DefinePlugin({
			'global.GENTLY': false
		})
	],
	externals: [nodeExternals()],
	module: {
		rules: [
			{
				test: /\.scss$/,
				include: /src/,
				use: [
					 MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							modules: true,
							camelCase: true,
							localIdentName: '[name]__[local]--[hash:base64:5]',
						}
					},
					'postcss-loader',
					{
						loader: 'sass-loader',
						options: {
							outputStyle: 'expanded'
						}
					}
			 ]
			},
			{
				test: /\.pug/,
				use: 'pug-loader'
			}
		]
	}
};

var serverConfig = merge({}, BaseConfig, ServerTemplate);
serverConfig.module.rules = BaseConfig.module.rules.concat(ServerTemplate.module.rules);

module.exports = serverConfig;
