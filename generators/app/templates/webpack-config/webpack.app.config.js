var path = require('path');
var merge = require('lodash.merge');
var BaseConfig = require('./webpack.base.config');
var config = require('../src/config/general.js');

var AppTemplate = {
	entry: ['@babel/polyfill', './src/app.js'],
	output: {
			publicPath: config.basePath,
			path: path.join(__dirname, '../build/public'),
			filename: 'app.js'
	},
	devtool: 'eval',
	module: {
		rules: [
			{
				test: /\.scss$/,
				include: /src/,
				use: [
					{
						loader: 'style-loader'
					},
					{
						loader: 'css-loader',
						options: {
							modules: {
								localIdentName: '[name]__[local]--[hash:base64:5]',
								exportLocalsConvention: 'camelCase'
							}
						}
					},
					'postcss-loader',
					{
						loader: 'sass-loader'
					}
				]
			}
		]
	}
};

var appConfig = merge({}, BaseConfig, AppTemplate);
appConfig.module.rules = BaseConfig.module.rules.concat(AppTemplate.module.rules);

module.exports = appConfig;
