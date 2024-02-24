import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './../../components/navbar/navbar.css';
import Name from '../../images/logo.png'

const NavLinks = () => (
	<React.Fragment>
		<p>
			<a href="/">Blog</a>
		</p>
		<p>
			<a href="/">Product</a>
		</p>
		<p>
		<Link to="/role-selection">Login</Link> {/* Replace <a> with <Link> */}
		</p>
	
		
	</React.Fragment>
);

const Navbar = () => {
	return (
		<div className="landing-navbar">
			<div className="landing-navbar-logo">
				<img src={Name} alt="aankh-logo" />
			</div>
			<div className="landing-navbar-links">
				<NavLinks />
			</div>
		</div>
	);
};

export default Navbar;
