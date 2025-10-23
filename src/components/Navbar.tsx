import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-logo">
          <NavLink to="/">MyBlog</NavLink>
        </div>
        <div className="nav-menu">
          <NavLink to="/" className="nav-link">
            Trang chủ
          </NavLink>
          <NavLink to="/create" className="nav-link">
            Viết bài
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;