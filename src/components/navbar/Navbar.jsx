import React from 'react';
import { Link } from 'react-router-dom'; 
import './../../components/navbar/navbar.css';
import Name from '../../images/Proctorpal.png'
import LoginIcon from '@mui/icons-material/Login';
import { IconButton } from '@mui/material';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import BookIcon from '@mui/icons-material/Book';

const NavLinks = () => (
	<React.Fragment>
		<p>
			<a href="/" className="nav-link"><BookIcon />Blog
			</a>
		</p>
		<p>
			<a href="/" className="nav-link"><ShoppingCartCheckoutIcon />Product
			</a>

		</p>
		<p>
		<Link to="/role-selection" className="nav-link"><LoginIcon />Get Started </Link>
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
