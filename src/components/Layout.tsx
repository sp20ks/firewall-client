import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';

const Layout: React.FC = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const isLoggedIn = Boolean(token);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="layout">
      <header className="header">
        <nav className="nav">
          <Link to="/" className="nav__link">Главная</Link>
          {isLoggedIn ? (
            <div className="nav__actions">
              <span className="nav__status">Вы в системе</span>
              <button onClick={handleLogout} className="btn btn--outline">Выйти</button>
            </div>
          ) : (
            <div className="nav__actions">
              <Link to="/login" className="nav__link">Вход</Link>
              <Link to="/register" className="nav__link">Регистрация</Link>
            </div>
          )}
        </nav>
      </header>
      <div className="content-with-sidebar">
        {isLoggedIn && <Sidebar />}
        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
