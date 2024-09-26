import React, { Fragment } from 'react';
import './HeaderContainer.css';
import classNames from 'classnames';

function HeaderContainer() {
    const [isSticky, setIsSticky] = React.useState(false);

    React.useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 44) {
                setIsSticky(true);
            } else {
                setIsSticky(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const className = classNames("header-container", isSticky ? 'sticky' : '');

    const handleClick = (e: any, targetId: any) => {
        e.preventDefault();
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const offsetPosition = targetElement.getBoundingClientRect().top + window.scrollY - 50;
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth',
            });
        }
    };

    return (
        <header className={className}>
            <nav className="navbar">
                <ul className="nav-list">
                    <li>
                        <a href="#home" onClick={(e) => handleClick(e, '#home')}>HOME</a>
                    </li>
                    <li>
                        <a href="#features" onClick={(e) => handleClick(e, '#features')}>FEATURES</a>
                    </li>
                    <li>
                        <a href="#about" onClick={(e) => handleClick(e, '#about')}>ABOUT US</a>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default HeaderContainer;