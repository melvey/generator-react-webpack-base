'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.Base.extend({
	prompting: function () {
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
	},

	writing: function () {
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
			this.templatePath('src/views/index.jade.ejs'),
			this.destinationPath('src/views/index.jade'),
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

		if(this.props.redux) {
			this.fs.copy(this.templatePath('src/redux/**/*'), this.destinationPath('src/redux'));
		}

		this.config.save();
	},

	install: function () {
		//this.installDependencies();
	}
});
