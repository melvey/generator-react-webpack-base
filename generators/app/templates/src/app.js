import {render} from 'react-dom';
import React from 'react';
import {Router, browserHistory} from 'react-router';
import routes from './routes';

const appContainer = document.getElementById('app');

const router = <Router history={browserHistory} routes={routes} />;

render(router, appContainer);
