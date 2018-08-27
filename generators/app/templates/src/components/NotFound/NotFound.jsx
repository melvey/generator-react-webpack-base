import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styles from './NotFound.scss';

class NotFound extends Component {

  static propTypes = {
		location: PropTypes.shape({
			pathname: PropTypes.string
		})
  };

	constructor(props) {
		super();
		this.props = props;
	}

	render() {
		return (
			<div className={styles.container}>
					<div className={styles.heading}>
						<h2>Error 404</h2>
					</div>
					<div className={styles.content}>
						<p>Oh dear! It looks like the page {this.props.location.pathname} could not be found.</p>
					</div>
				</div>
		);
	}

}

export default NotFound;
