import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./../styles/App.css";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Determine active link
  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  // Smooth scroll if redirected with hash
  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100); // delay helps if page transition takes time
      }
    }
  }, [location]);

  const handleNavClick = (hash) => {
    navigate("/#" + hash);
  };

  const handleMenuCategoryClick = (category) => {
    navigate(`/menu?category=${encodeURIComponent(category)}`);
    setMenuOpen(false);
  };
    return (
    <header className="navbar">
      <div className="logo">
        <Link to="/">
          <img
            src="https://little-lemon-react-capstone.vercel.app/static/media/little-lemon.d4cae6fac8384c2dae04.png"
            alt="Little Lemon"
          />
        </Link>
      </div>
      <nav className={`nav-links ${menuOpen ? "open" : ""}`} aria-label="Main navigation">
        <Link to="/" className={`nav-link ${isActive('/') ? 'active-link' : ''}`}> Home </Link>
        <button className={`nav-button ${location.hash === '#about' ? 'active-link' : ''}`} onClick={() => handleNavClick("about")}> 
          About 
        </button>
        <div className="dropdown">
          <button className={`dropbtn ${isActive('/menu') ? 'active-link' : ''}`} style={{ fontSize: '0.9rem', fontFamily: 'Karla, sans serif' }}>
            Menu ▾
          </button>
          <div className="dropdown-content">
            <button className={`nav-button ${location.search.includes('Starters') ? 'active-link' : ''}`} onClick={() => handleMenuCategoryClick("Starters")}>
              Starters
            </button>
            <button className={`nav-button ${location.search.includes('Mains') ? 'active-link' : ''}`} onClick={() => handleMenuCategoryClick("Mains")}>
              Mains
            </button>
            <button className={`nav-button ${location.search.includes('Desserts') ? 'active-link' : ''}`} onClick={() => handleMenuCategoryClick("Desserts")}>
              Desserts
            </button>
            <button className={`nav-button ${location.search.includes('Drinks') ? 'active-link' : ''}`} onClick={() => handleMenuCategoryClick("Drinks")}>
              Drinks
            </button>
          </div>
        </div>
        <button className={`nav-button ${location.hash === '#testimonials' ? 'active-link' : ''}`} onClick={() => handleNavClick("testimonials")}>
          Review
        </button>
        <button id="order-online" className={`nav-button ${location.hash === '#special' ? 'active-link' : ''}`} onClick={() => handleNavClick("special")}> 
          Specials!! 
        </button>
        <Link to="/reservation" className={`reservation ${isActive('/reservation') ? 'active-link' : ''}`}> Reservation </Link>
      </nav>
      <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-controls="nav-links" aria-label="Toggle Navigation Menu">☰</div>
    </header>
  );
};

export default Header;