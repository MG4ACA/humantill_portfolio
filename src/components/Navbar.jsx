import { useState } from 'react';
import '../assets/styles/navbar.css';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const toggle = () => setOpen((v) => !v);

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-logo">
          <div className="logo-container">
            <img
              src="/images/logos/jeewithaloka-english-logo.png"
              alt="HumaniTill Logo"
              className="main-logo"
            />
          </div>
        </div>

        <ul className={`nav-menu ${open ? 'active' : ''}`}>
          <li>
            <a href="#home" className="nav-link" onClick={() => setOpen(false)}>
              Home
            </a>
          </li>
          <li>
            <a href="#about" className="nav-link" onClick={() => setOpen(false)}>
              About
            </a>
          </li>
          <li>
            <a href="#highlights" className="nav-link" onClick={() => setOpen(false)}>
              Project
            </a>
          </li>
          <li>
            <a href="#locations" className="nav-link" onClick={() => setOpen(false)}>
              Locations
            </a>
          </li>
          <li>
            <a href="#gallery" className="nav-link" onClick={() => setOpen(false)}>
              Gallery
            </a>
          </li>
          <li>
            <a href="#contact" className="nav-link" onClick={() => setOpen(false)}>
              Contact
            </a>
          </li>
        </ul>

        <div
          className={`hamburger ${open ? 'active' : ''}`}
          onClick={toggle}
          role="button"
          tabIndex={0}
          aria-label="Toggle navigation menu"
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') toggle();
          }}
        >
          <span className="bar" />
          <span className="bar" />
          <span className="bar" />
        </div>
      </div>
    </nav>
  );
}
