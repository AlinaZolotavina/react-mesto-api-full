import React from 'react';
import { Link } from 'react-router-dom'; 
import { useLocation } from 'react-router';
import logoPath from '../images/logo.svg';

function Header({ userEmail, onLogout }) {
  const location = useLocation();
  
  return (
    <header className="header">
      <img className="header__logo" alt="логотип" src={logoPath}/>
      <div className="header__container">
        <p className="header__user-email">{userEmail}</p>
        <Link
          to={
            location.pathname === '/sign-up' ? '/sign-in'
            : location.pathname === '/sign-in' ? '/sign-up'
            : '/sign-in'
          }
          className="header__link"
          onClick={location.pathname === '/' ? onLogout : () => {}}
        >
          {
            location.pathname === "/sign-up" ? "Войти"
            : location.pathname === "/sign-in" ? "Регистрация"
            : 'Выйти'
          }
        </Link>
      </div>    
    </header>
  )
};

export default Header;