var fs = require('fs');

// The general template is fine to use as a config so put that in if it is missing
var configFile = './src/config/general.js';
var configTemplate = './src/config/templates/general.js';
if(!fs.existsSync(configFile) && fs.existsSync(configTemplate)) {
	fs.createReadStream(configTemplate).pipe(fs.createWriteStream(configFile));
}


var appConfig = require('./webpack-config/webpack.app.config');
var serverConfig = require('./webpack-config/webpack.server.config');

module.exports = [appConfig, serverConfig];

