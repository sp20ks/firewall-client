import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar: React.FC = () => {
  return (
    <aside className="sidebar">
      <nav>
        <ul>
          <li><NavLink to="/">Главная</NavLink></li>
          <li><NavLink to="/rules">Правила</NavLink></li>
          <li><NavLink to="/resources">Ресурсы</NavLink></li>
          <li><NavLink to="/ip_lists">IP-листы</NavLink></li>
          <li><a href="http://localhost:5601" target="_blank" rel="noopener noreferrer">Логи (Kibana)</a></li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
