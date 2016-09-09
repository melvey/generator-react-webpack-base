import React, {Component, PropTypes} from 'react';
import Header from '../Header';
import styles from './App.scss';

class App extends Component {

	constructor() {
		super();

	}

  static propTypes = {
  };

  render() {
	return (
		<div>
			<Header />
			{this.props.children}
		</div>
	);
  }

}

export default App;
