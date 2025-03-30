import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import style from '../style/Navbar.module.css';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/auth/logout`, {
        method: 'POST',
        credentials: 'include',
      });
      if (response.ok) {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        navigate('/');
      } else {
        console.error('Failed to log out');
      }
    } catch (err) {
      console.error('Error:', err.message);
    }
  };

  const isAdmin = localStorage.getItem('role') === 'admin';

  return (
    <div className={style.navbar}>
      <div className={style.logo}>
        <span>COMMERCIFY</span>
      </div>
      <div className={style.navLinks}>
        {isAdmin && (
          <Link to="/admin" className={style.adminLink}>
            Admin Page
          </Link>
        )}
        <button className={style.logoutButton} onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;