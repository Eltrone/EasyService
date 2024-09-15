import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';
import '../styles/footer.css'; // Assurez-vous d'importer le CSS

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <FontAwesomeIcon icon={faPhone} /> +33(0)6.18.45.64.16
                <FontAwesomeIcon icon={faLinkedin} /> <a href="https://fr.linkedin.com/in/amine-el-orche-a1038980" target="_blank" rel="noopener noreferrer">Linkedin</a>
                <FontAwesomeIcon icon={faEnvelope} /> <Link to="/contact">Contact us</Link>
            </div>
            <div className="footer-rights">© 2024 EasyService. All right reserved.</div>
        </footer>
    );
};

export default Footer;
