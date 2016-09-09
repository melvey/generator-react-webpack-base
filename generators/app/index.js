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
			this.templatePath('_package.json'),
			this.destinationPath('package.json'),
			{
				name: this.props.name
			}
		);

		this.fs.copyTpl(
			this.templatePath('src/views/_index.jade'),
			this.destinationPath('src/views/index.jade'),
			{
				name: this.props.name,
				description: this.props.description
			}
		);

		this.fs.copy(this.templatePath('src/*.js'), this.destinationPath('src'));
		this.fs.copy(this.templatePath('src/webpack-config/*.js'), this.destinationPath('src/webpack-config'));
		this.fs.copy(this.templatePath('src/components/**/*'), this.destinationPath('src/components'));
  },

  install: function () {
    //this.installDependencies();
  }
});
