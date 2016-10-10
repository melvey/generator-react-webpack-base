'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var fs = require('fs');
var path = require('path');

module.exports = yeoman.Base.extend({
	prompting: function () {

		// Get existing components for prompt
		var componentDir = 'src/components';
		var components = fs.readdirSync(componentDir).filter(function(file) {
			return fs.statSync(path.join(componentDir, file)).isDirectory()
		});

		var prompts = [
			{
				type: components.length > 0 ? 'list' : input,
				name: 'component',
				message: 'Component to create container of',
				choices: components
			},
			{
				type: 'confirm',
				name: 'redux',
				message: 'Use redux?',
				default: false
			}
		];

		console.log();
		return this.prompt(prompts).then(function (props) {
			// To access props later use this.props.someAnswer;
			this.props = props;
		}.bind(this));
	},

	writing: function () {

		var cleanName = this.props.component.replace(/\s*\b\w/g, function(letter) {
			console.log(letter);
			return letter.charAt(letter.length - 1).toUpperCase();
		});

		const dir = 'src/containers/';

		if(this.props.redux) {
				this.fs.copyTpl(
					this.templatePath('redux-container.js.ejs'),
					this.destinationPath(path.join(dir, cleanName + 'Container.js')),
					{
						component: cleanName
					}
				);
		} else {
				this.fs.copyTpl(
					this.templatePath('container.js.ejs'),
					this.destinationPath(path.join(dir, cleanName + 'Container.js')),
					{
						component: cleanName
					}
				);
		}
	},

	install: function () {
		//this.installDependencies();
	}
});
