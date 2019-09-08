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
					{
						loader: 'babel-loader',
						options: {
							presets: ['@babel/preset-env', '@babel/preset-react'],
							plugins: ["@babel/plugin-proposal-class-properties"]
						},
					}
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
