'use strict';
var Generator = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = class extends Generator {
	prompting() {

		var prompts = [
			{
				type: 'config',
				name: 'redux',
				message: 'Add redux files to this project?',
				default: true
			}
		];

		return this.prompt(prompts).then(function (props) {
			this.props = props;
		}.bind(this));
	}

	writing() {
		if(this.props.redux) {
			this.fs.copy(this.templatePath('src/redux/**/*'), this.destinationPath('src/redux'));

			var packageJSON = {
				dependencies: {
					redux: '^4.0.0',
					'react-redux': '^5.0.7'
				}
			};
			this.fs.extendJSON('package.json', packageJSON);

			var serverPath = 'src/server.js';
			if(this.fs.exists(serverPath)) {
				var serverJS = this.fs.read(serverPath);
				serverJS = serverJS.replace(/import/, "import {Provider} from 'react-redux';\nimport store from './redux/store';\nimport");
				serverJS = serverJS.replace(/(<RouterContext.*?\/>)/, function(full, match) { return '<Provider store={store}>' + match + '</Provider>'; });
				console.log(serverJS);
				this.fs.write(serverPath, serverJS);
			}
		}
	}

	install() {
		this.installDependencies();
	}
};
