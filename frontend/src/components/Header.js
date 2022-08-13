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
            location.pathname === '/signup' ? '/signin'
            : location.pathname === '/signin' ? '/signup'
            : '/signin'
          }
          className="header__link"
          onClick={location.pathname === '/' ? onLogout : () => {}}
        >
          {
            location.pathname === "/signup" ? "Войти"
            : location.pathname === "/signin" ? "Регистрация"
            : 'Выйти'
          }
        </Link>
      </div>    
    </header>
  )
};

export default Header;