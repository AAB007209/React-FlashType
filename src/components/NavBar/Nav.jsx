import React from 'react';
import logo from './../../assets/logo.png';
import GithubLogo from './../../assets/GithubLogo.png';
import './Nav.css';

const Nav = () => {
    return (
        <div className="nav-container">
            <div className = "nav-left">
                <img className="flash-logo" src={logo} alt="logo" />
                <p className="flash-logo-text">Flashtype</p>
            </div>
            <div className="nav-right">
                <a
                    target="_blank"
                    href="https://aab007209.github.io/React-NameIt/"
                    rel="noreferrer"
                >
                    <img className="github-logo" src={GithubLogo} alt="logo" />
                </a>
            </div>
        </div>
    );
}

export default Nav;
