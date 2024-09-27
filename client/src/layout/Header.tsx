import React from 'react';
import { Link } from 'react-router-dom';
import { User, useUser } from '../contexts/userAuth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faSearch, faAddressBook, faPerson, faSignInAlt, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import '../styles/header.css';
import axios from '../utils/axios';

// const loggedIn = (user: User) => <Link to="/profile" className="nav-link">{user?.username} ({user?.role})</Link>;
const LoggedIn = () => {
	const { user } = useUser();

	function logout() {
		axios.post("/logout").then(response => {
			localStorage.removeItem("access_token");
			window.location.href = '/';
		});
	}

	return (
		<>
			<Link to="/signup" className="signup-link">
				<FontAwesomeIcon icon={faUserPlus} /> Update your infromation
			</Link>
			<Link to="/profile" className="login-link">
				<FontAwesomeIcon icon={faPerson} /> Profile
			</Link>
		</>
	)
}

const connection = (
	<>
		<Link to="/signup" className="signup-link">
			<FontAwesomeIcon icon={faUserPlus} /> Create your account
		</Link>
		<Link to="/login" className="login-link">
			<FontAwesomeIcon icon={faSignInAlt} /> Log In
		</Link>
	</>
)

const Header: React.FC = () => {
	const { user } = useUser();
	return (
		<header className="header">
			<nav className="header-nav">
				<div className="main-links">
					<Link to="/" className="nav-link">
						<FontAwesomeIcon icon={faHome} /> HOME
					</Link>
					<Link to="/search" className="nav-link">
						<FontAwesomeIcon icon={faSearch} /> SEARCH FOR SERVICE PROVIDERS
					</Link>
					<Link to="/contact-us" className="nav-link">
						<FontAwesomeIcon icon={faAddressBook} /> CONTACT US
					</Link>
				</div>
				<div className="auth-links">
					{user ? <LoggedIn /> : connection}
				</div>
			</nav>
		</header>
	);
};

export default Header;
