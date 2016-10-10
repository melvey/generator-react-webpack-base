'use strict';
var yeoman = require('yeoman-generator');
var inquirer = require('inquirer');
var chalk = require('chalk');
var ejs = require('ejs');
var path = require('path');
var fs = require('fs');
var yosay = require('yosay');

module.exports = yeoman.Base.extend({
	prompting: function () {

		// Get existing components for prompt
		var reducerDir = 'src/redux/reducers';
		var reducers = fs.readdirSync(reducerDir).map(function(file) {
			return file.replace(/(.*?)Reducer.js/, function(full, match) {
				return match === '' ? null : match;
			})
		}).filter(function(reducer) {
			return typeof reducer === 'string' && reducer.length
		});

		var createReducerAnswer = 'Create a new reducer';

		var prompts = [
			{
				type: 'input',
				name: 'name',
				message: 'What is the name of this action'
			},
			{
				type: 'confirm',
				name: 'useReducer',
				message: 'Do you want to create/update a reducer?',
				default: true
			},
			{
				when: function(answers) { return answers.useReducer},
				type: 'list',
				name: 'reducer',
				message: 'Update an existing reducer?',
				choices: [createReducerAnswer, new inquirer.Separator].concat(reducers)
			},
			{
				when: function(answers) { return answers.reducer === createReducerAnswer },
				type: 'input',
				name: 'newReducer',
				message: 'Enter reducer name'
			}
		];

		return this.prompt(prompts).then(function (props) {
			this.props = props;
		}.bind(this));
	},

	writing: function () {
		var toCamelCase = function(string) {
			return string.replace(/\s+\b\w/g, function(letter) {
				return letter.charAt(letter.length - 1).toUpperCase();
			});
		};

		var dir = 'src/redux';
		var actionName = toCamelCase(this.props.name);
		let actionFileName = actionName.charAt(0).toUpperCase() + actionName.slice(1) + 'Action.js';

		this.fs.copyTpl(
			this.templatePath('action.js.ejs'),
			this.destinationPath(path.join(dir, 'actions', actionFileName)),
			{
				fileName: actionFileName,
				actionName: actionName
			}
		);

		// Add the action to the action type list
		var actionFile = 'src/redux/actionTypes.js';
		var actionJS = this.fs.read(actionFile);
		if(actionJS) {
			actionJS = actionJS.replace(/(\s*)([a-zA-Z]+: '[a-zA-Z]+')\n/, function(all, indent, match) {
				return indent + match + ',' + indent + actionName + ': \'' + actionName + '\'\n';
			});
			this.fs.write(actionFile, actionJS);
		}


		// Update actions file
		if(this.props.newReducer) {
			var reducerName = toCamelCase(this.props.newReducer);
			let reducerFilename = reducerName.charAt(0).toUpperCase() + reducerName.slice(1) + 'Reducer.js';

			this.fs.copyTpl(
				this.templatePath('reducer.js.ejs'),
				this.destinationPath(path.join(dir, 'reducers', reducerFilename)),
				{
					filename: reducerFilename,
					name: reducerName,
					action: actionName
				}
			);
		} else if(this.props.reducer) {
			// Update existing reducer
			var reducerPath = path.join(dir, 'reducers', this.props.reducer + 'Reducer.js');
			if(this.fs.exists(reducerPath)) {
				var funcEjs = this.fs.read(this.templatePath('reducerFunc.ejs'));
				var functionString = ejs.render(funcEjs, {action: actionName});

				var reducerJS = this.fs.read(reducerPath)
					.replace(/[ 	]*export default/, function(match) { return functionString + match; })
					.replace(/(\s*)(default:)/, function(all, indent, tail) { 
					return indent + 'case actionTypes.' + actionName + ':'
						+ indent + '	return handle' + actionName.charAt(0).toUpperCase() + actionName.slice(1) + '(action.payload);'
						+ indent + tail;
				});
				this.fs.write(reducerPath, reducerJS);
			}
		}
	},

	install: function () {
	}
});
