import React, {Component} from 'react';
import styles from './Header.scss';
import {Link} from 'react-router-dom';
import logo from './logo.png';

class Header extends Component {

  render() {
		return (
				<div className={styles.root}>
					<div className={styles.container}>
						<Link to="/" className={styles.brand}>
							<img src={logo} width="38" height="38" alt="React" />
							<span className={styles.brandTxt}>Your Company</span>
						</Link>
						<div className={styles.banner}>
							<h1 className={styles.bannerTitle}>React</h1>
							<p className={styles.bannerDesc}>Complex web apps made easy</p>
						</div>
					</div>
				</div>
		);
  }

}

export default Header;
