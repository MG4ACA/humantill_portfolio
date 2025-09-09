import { useEffect, useState } from 'react';
import '../assets/styles/navbar.css';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const toggle = () => setOpen((v) => !v);

  const [active, setActive] = useState('home');

  useEffect(() => {
    const ids = ['home', 'about', 'highlights', 'gallery', 'contact'];
    const observers = [];

    const onIntersect = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActive(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(onIntersect, {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    });

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        observer.observe(el);
        observers.push({ id, el });
      }
    });

    return () => {
      observer.disconnect();
      observers.length = 0;
    };
  }, []);

  function handleNavClick(e, id) {
    e.preventDefault();
    setOpen(false);
    setActive(id);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }

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
            <a
              href="#home"
              className={`nav-link ${active === 'home' ? 'active' : ''}`}
              onClick={(e) => handleNavClick(e, 'home')}
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="#about"
              className={`nav-link ${active === 'about' ? 'active' : ''}`}
              onClick={(e) => handleNavClick(e, 'about')}
            >
              About
            </a>
          </li>
          <li>
            <a
              href="#highlights"
              className={`nav-link ${active === 'highlights' ? 'active' : ''}`}
              onClick={(e) => handleNavClick(e, 'highlights')}
            >
              Project
            </a>
          </li>
          {/* <li>
            <a href="#locations" className={`nav-link ${active === 'locations' ? 'active' : ''}`} onClick={(e) => handleNavClick(e, 'locations')}>
              Locations
            </a>
          </li> */}
          <li>
            <a
              href="#gallery"
              className={`nav-link ${active === 'gallery' ? 'active' : ''}`}
              onClick={(e) => handleNavClick(e, 'gallery')}
            >
              Gallery
            </a>
          </li>
          <li>
            <a
              href="#contact"
              className={`nav-link ${active === 'contact' ? 'active' : ''}`}
              onClick={(e) => handleNavClick(e, 'contact')}
            >
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
