import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'

function Navbar() {
    const [click, setClick] = useState(false);
    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);
 

    return (
        <>
          <nav className="navbar">
              <div className="navbar-container">
                  <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
                      {/* Navbar elem */}
                      Beer Game 
                  </Link>
                  <div className='menu-icon' onClick = {handleClick}>
                      <i className={click ? 'fas fa-times' : 'fas fa-bars'} /> 
                  </div>
                  <ul className = {click ? 'nav-menu active':'nav-menu'}>
                      <li className = 'nav-item'>
                          <Link to ='/' className = 'nav-links' onClick={closeMobileMenu}>
                              Home
                          </Link>
                      </li>
                      <li className = 'nav-item'>
                          <Link to ='/about' className = 'nav-links' onClick={closeMobileMenu}>
                              About
                          </Link>
                      </li>
                      {/* <li className = 'nav-item'>
                          <Link to ='/login' className = 'nav-links' onClick={closeMobileMenu}>
                              Login
                          </Link>
                      </li> */}
                      <li className = 'nav-item'>
                          <Link to ='/learn_more' className = 'nav-links' onClick={closeMobileMenu}>
                              Learn More
                          </Link>
                      </li>
                  </ul>
                  {/* <Link to="/animation">
                    {button && <Button buttonStyle = 'btn--outline'>Get Started</Button>}
                  </Link> */}
              </div>
          </nav>
        </>
    );
}

export default Navbar;