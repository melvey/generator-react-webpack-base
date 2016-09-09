function getEntrySources(sources) {
    if (process.env.NODE_ENV !== 'production') {
        sources.push('webpack-dev-server/client?http://localhost:8080');
        sources.push('webpack/hot/only-dev-server');
    }

    return sources;
}

module.exports = {
	entry: getEntrySources(['babel-polyfill', './src/app.js']),
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
