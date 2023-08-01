import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';

import logo from '../images/logo.svg';

function Header({ loggedIn, userEmail, signOut }) {

    const location = useLocation();
    const textLink = location.pathname === '/sign-in' ? "Регистрация" : 'Войти';
    const signOutText = loggedIn ? 'Выйти' : textLink;
    const email = userEmail;
    return (
        <header className="header">
            <div className='header__container'>
                <Link to="/main">
                    <img src={logo} alt="Логотип" className="logo" />
                </Link>
                {loggedIn && <p className='header__email'>{email}</p>}
                <Routes>
                    <Route path='/sign-up'
                        element={
                            <Link to='/sign-in' className='header__links'>Войти</Link>
                        }
                    />
                    <Route path='/sign-in'
                        element={
                            <Link to='/sign-up' className='header__links'>Регистрация</Link>
                        }
                    />
                </Routes>
                {loggedIn && (
                    <button
                        className="header__button"
                        onClick={signOut}
                    >
                        {signOutText}
                    </button>
                )}
            </div>
        </header>
    )
}
export default Header 
