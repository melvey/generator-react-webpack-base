var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
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
		new ExtractTextPlugin({filename: 'style.css'}),
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
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: [
						{
							loader: 'css-loader',
							options: {
								sourceMap: true,
								modules: true,
								camelCase: true,
								localIdentName: '[name]__[local]--[hash:base64:5]',
							}
						},
						{
							loader: 'sass-loader',
							options: {
								sourceMap: true
							}
						}
					]
				})
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
