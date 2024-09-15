import React from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../contexts/userAuth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faSearch, faAddressBook, faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import '../styles/header.css';  // Assurez-vous d'importer le CSS

const Header: React.FC = () => {
  const user = useUser();

  return (
    <header className="header bg-light">
      <nav className="header-nav">
        <div className="nav-content">
          <Link to="/" className="nav-link">
            <FontAwesomeIcon icon={faHome} /> HOME
          </Link>
          <Link to="/SearchProvider" className="nav-link">
            <FontAwesomeIcon icon={faSearch} /> SEARCH FOR SERVICE PROVIDERS
          </Link>
          <Link to="/ContactUs" className="nav-link">
            <FontAwesomeIcon icon={faAddressBook} /> CONTACT US
          </Link>
          {user?.user ? (
            <Link to="/profile" className="nav-link">{user.user.name} ({user.user.type})</Link>
          ) : (
            <Link to="/login" className="nav-link login-link">
              <FontAwesomeIcon icon={faSignInAlt} /> Log In
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
