'use strict';
var Generator = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var path = require('path');

module.exports = class extends Generator {
	prompting() {
		var prompts = [
			{
				type: 'input',
				name: 'name',
				message: 'Component name',
			},
			{
				type: 'list',
				name: 'type',
				message: 'Would you like a pure function or classs component?',
				choices: ['function', 'class'],
				default: 'function'
			}
		];


		return this.prompt(prompts).then(function (props) {
			// To access props later use this.props.someAnswer;
			this.props = props;
		}.bind(this));
	}

	writing() {

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

		const template = this.props.type === 'class' ? 'class-component.jsx.ejs' : 'function-component.jsx.ejs';
		this.fs.copyTpl(
			this.templatePath(template),
			this.destinationPath(path.join(dir, cleanName + '.jsx')),
			{
				name: cleanName
			}
		);

		this.fs.copy(
			this.templatePath('style.scss'),
			this.destinationPath(path.join(dir, cleanName + '.scss'))
		);

	}

	install() {
		//this.installDependencies();
	}
};
