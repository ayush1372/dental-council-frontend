import './navbar.scss';

import { useState } from 'react';

import MenuIcon from '@mui/icons-material/Menu';
import { NavLink } from 'react-router-dom';

// import { Button } from './Button';
import Dropdown from './dropdown';

function Navbar() {
  const [click, setClick] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const onMouseEnter = () => {
    // if (window.innerWidth < 960) {
    //   setDropdown(false);
    // } else {
    setDropdown(true);
    // }
  };

  const onMouseLeave = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(false);
    }
  };

  return (
    <nav className="navbar">
      <div className="menu-icon" onClick={handleClick}>
        {/* <i className={click ? 'fas fa-times' : 'fas fa-bars'} /> */}
        <MenuIcon />
      </div>
      <ul className={click ? 'nav-menu active' : 'nav-menu'}>
        <li className="nav-item">
          <NavLink to="/" className="nav-links" onClick={closeMobileMenu}>
            About NMR
          </NavLink>
        </li>
        <li className="nav-item" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
          <NavLink className="nav-links">
            NMR Act <i className="fas fa-caret-down" />
          </NavLink>
          {dropdown && <Dropdown />}
        </li>
        <li className="nav-item">
          <NavLink to="/products" className="nav-links" onClick={closeMobileMenu}>
            Rules & Regulations
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/contact-us" className="nav-links" onClick={closeMobileMenu}>
            Information Desk
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/sign-up" className="nav-links" onClick={closeMobileMenu}>
            Media Room
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/sign-up" className="nav-links" onClick={closeMobileMenu}>
            E-Gazette
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/sign-up" className="nav-links" onClick={closeMobileMenu}>
            Photo Gallery
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/search-doctor" className="nav-links" onClick={closeMobileMenu}>
            Search Doctor
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
