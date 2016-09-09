module.exports = {
	devtool: 'eval',
	module: {
		preLoaders: [
			{
				test: /\.jsx?$/,
				exclude: /(node_modules|bower_components)/,
				loader: 'source-map'
			},
			{
				test: /\.json$/,
				loader: 'json'
			}
		],
		loaders: [
			{
				test: /\.(jpe?g|png|gif|svg)$/i,
				loaders: [
					'url?limit=8192',
					'img'
				]
			},
			{
				test: /\.jsx?$/,
				exclude: /(node_modules|bower_components)/,
				loaders: [
					'react-hot',
					'babel?presets[]=es2015,presets[]=react,presets[]=stage-0'
				]
			}
		]
	}
};
