module.exports = {
	devtool: 'eval',
	module: {
		rules: [
			{
				test: /\.(jpe?g|png|gif|svg)$/i,
				use: [
					'url-loader?limit=8192',
					'img-loader'
				]
			},
			{
				test: /\.(eot|svg|woff(2)?|ttf)(\?[a-z0-9=&.]+)?$/,
				use: 'file-loader'
			},
			{
				test: /\.jsx?$/,
				exclude: /(node_modules|bower_components)/,
				use: [
					'babel-loader?presets[]=react,presets[]=stage-0'
				]
			},
			{
				test: /\.sql$/,
				use: 'raw-loader'
			}
		]
	},
	resolve: {
		extensions: ['.js', '.jsx']
	}
};
