import React, { Component } from 'react';
import styles from './About.scss';

class About extends Component {

  render() {
		return (
				<div className={styles.root}>
					<div className={styles.container}>
						<div className={styles.heading}>
							<h2>About</h2>
						</div>
						<div className={styles.content}>
							<p>This template is build using React, Webpack, SASS and ReactRouter. It is intended as a starting point for isometric react projects and generates a server side script from src/server.js and client side using src/app.js. React router configuration is in src/routes.js.</p>
						</div>
					</div>
				</div>
		);
  }

}

export default About;
