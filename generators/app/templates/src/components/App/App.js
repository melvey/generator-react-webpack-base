import React, {Component, PropTypes} from 'react';
import {Route, Redirect} from 'react-router';
import Header from '../Header';
import styles from './App.scss';
import Index from '../Index';
import About from '../About';
import NotFound from '../NotFound';

class App extends Component {

	constructor(props) {
		super();

		this.props = props;
	}

  static propTypes = {
  };

  render() {
	const basePath = this.props.basePath || '/';

	return (
		<div>
			<Header />
			<div className={styles.appBody}>
				<Route exact path={basePath} component={Index} />
				<Route path="about" component={About} />
				<Route path="*" component={NotFound} />
			</div>
		</div>
	);
  }

}

export default App;
