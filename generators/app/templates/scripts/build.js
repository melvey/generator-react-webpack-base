import webpack from 'webpack';
import webpackConfig from '../webpack.config';

const bundler = webpack(webpackConfig);
bundler.run();
