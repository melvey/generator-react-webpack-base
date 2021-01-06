'use strict';
var Generator = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var mkdirp = require('mkdirp');

module.exports = class extends Generator {
	prompting() {
		// Have Yeoman greet the user.
		this.log(yosay(
			'Welcome to the mind-blowing ' + chalk.red('generator-react-webpack-base') + ' generator!'
		));

		var prompts = [
			{
				type: 'input',
				name: 'name',
				message: 'Your project name',
				default: this.appname
			},
			{
				type: 'input',
				name: 'description',
				message: 'Project description',
				default: ''
			},
			{
				type: 'config',
				name: 'redux',
				message: 'Use redux?',
				default: false
			}
		];

		return this.prompt(prompts).then(function (props) {
			// To access props later use this.props.someAnswer;
			this.props = props;
		}.bind(this));
	}

	writing() {
		this.fs.copyTpl(
			this.templatePath('package.json.ejs'),
			this.destinationPath('package.json'),
			{
				name: this.props.name.trim().replace(/\s+/g, '_'),
				description: this.props.description,
				redux: this.props.redux
			}
		);

		this.fs.copyTpl(
			this.templatePath('src/views/index.pug.ejs'),
			this.destinationPath('src/views/index.pug'),
			{
				name: this.props.name,
				description: this.props.description
			}
		);

		this.fs.copyTpl(
			this.templatePath('src/server.js.ejs'),
			this.destinationPath('src/server.js'),
			{
				redux: this.props.redux
			}
		);

		this.fs.copyTpl(
			this.templatePath('src/app.js.ejs'),
			this.destinationPath('src/app.js'),
			{
				redux: this.props.redux
			}
		);

		this.fs.copy(this.templatePath('src/*.js'), this.destinationPath('src'));
		this.fs.copy(this.templatePath('webpack.config.js'), this.destinationPath('webpack.config.js'));
		this.fs.copy(this.templatePath('webpack-config/*.js'), this.destinationPath('webpack-config'));
		this.fs.copy(this.templatePath('src/components/**/*'), this.destinationPath('src/components'));
		this.fs.copy(this.templatePath('src/config/**/*'), this.destinationPath('src/config/templates'));

		// webpack copy plugin now fails if there are no files to copy so put a dummy file in
		this.fs.copy(this.templatePath('src/public/**/*'), this.destinationPath('src/public'));

		if(this.props.redux) {
			this.fs.copy(this.templatePath('src/redux/**/*'), this.destinationPath('src/redux'));
		}

		this.config.save();
	}

	install() {
		//this.installDependencies();
	}
};
