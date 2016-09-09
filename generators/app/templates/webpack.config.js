var BaseConfig = require('./webpack-config/webpack.base.config');
var AppTemplate = require('./webpack-config/webpack.app.config');
var ServerTemplate = require('./webpack-config/webpack.server.config');
var merge = require('lodash.merge');

// TODO: Write an alternate merge function that appends arrays instead of merging them
var appConfig = merge({}, BaseConfig, AppTemplate);
appConfig.module.loaders = BaseConfig.module.loaders.concat(AppTemplate.module.loaders);

var serverConfig = merge({}, BaseConfig, ServerTemplate);
serverConfig.module.loaders = BaseConfig.module.loaders.concat(ServerTemplate.module.loaders);

//module.exports = [appConfig, serverConfig];
module.exports = [appConfig, serverConfig];

