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
				name: 'name',
				message: 'Component name',
			}
		];

		return this.prompt(prompts).then(function (props) {
			// To access props later use this.props.someAnswer;
			this.props = props;
		}.bind(this));
	},

	writing: function () {

		let cleanName = this.props.name.replace(/\s*\b\w/g, function(letter) {
			console.log(letter);
			return letter.charAt(letter.length - 1).toUpperCase();
		});

		const dir = path.join('src/components', cleanName);

		this.fs.copyTpl(
			this.templatePath('package.json.ejs'),
			this.destinationPath(path.join(dir, 'package.json')),
			{
				name: cleanName
			}
		);

		this.fs.copyTpl(
			this.templatePath('component.js.ejs'),
			this.destinationPath(path.join(dir, cleanName + '.js')),
			{
				name: cleanName
			}
		);

		this.fs.copy(
			this.templatePath('style.scss'),
			this.destinationPath(path.join(dir, cleanName + '.scss'))
		);

	},

	install: function () {
		//this.installDependencies();
	}
});
