module.exports = {
	entry: ['babel-polyfill', './src/app.js'],
    output: {
        publicPath: '/',
				path: 'build/public',
        filename: 'app.js'
    },
    devtool: 'eval',
	module: {
		loaders: [
            {
                test: /\.scss$/,
                include: /src/,
                loaders: [
                    'style',
                    'css',
                    'autoprefixer?browsers=last 3 versions',
                    'sass?outputStyle=expanded'
                ]
            }
		]
	}
};
