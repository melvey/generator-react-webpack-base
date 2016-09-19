'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var path = require('path');

module.exports = yeoman.Base.extend({
	prompting: function () {
		var prompts = [
			{
				type: 'input',
				component: 'component',
				message: 'Component component',
			},
			{
				type: 'config',
				component: 'redux',
				message: 'Use redux?',
				default: false
			}
		];

		return this.prompt(prompts).then(function (props) {
			// To access props later use this.props.someAnswer;
			this.props = props;
		}.bind(this));
	},

	writing: function () {

		let cleanName = this.props.component.replace(/\s*\b\w/g, function(letter) {
			console.log(letter);
			return letter.charAt(letter.length - 1).toUpperCase();
		});

		const dir = path.join('src/containers/', cleanName);

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
