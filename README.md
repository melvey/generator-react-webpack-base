# generator-react-webpack-base [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url]
> A base template for a fullstack react webpack application

## About
A base template for an isomorphic react application using webpack. 

* Webpack build for both client and server output
* ES2015 using babel
* SASS styling

## Installation

First, install [Yeoman](http://yeoman.io) and generator-react-webpack-base using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo
npm install -g generator-react-webpack-base
```

Then generate your new project:

```bash
yo react-webpack-base
```
You will be prompted if you want to use redux or not. If you choose not to use redux and want to add it later you can run
```bash
yo react-webpack-base:redux
```

### Add a Component ###
To add a new component run
```bash
yo react-webpack-base:component
```
This will create a new component in the components directory

### Create a container ###
To create a container for an existing component run
```bash
yo react-webpack-base:container
```
You will be prompted to select the component to wrap and if this is a redux container.

### Create a redux action ###
To create a new redux action use
```bash
yo react-webpack-base:redux-action
```
You will be prompted for the action name and the reducer to use. If the reducer does not exist it will be created (you will still need to add it to combine reducers).

## License

Apache-2.0 © [Elvey]()


[npm-image]: https://badge.fury.io/js/generator-react-webpack-base.svg
[npm-url]: https://npmjs.org/package/generator-react-webpack-base
[travis-image]: https://travis-ci.org/melvey/generator-react-webpack-base.svg?branch=master
[travis-url]: https://travis-ci.org/melvey/generator-react-webpack-base
[daviddm-image]: https://david-dm.org/melvey/generator-react-webpack-base.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/melvey/generator-react-webpack-base
