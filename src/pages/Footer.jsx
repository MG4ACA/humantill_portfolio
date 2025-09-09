import '../assets/styles/footer.css';

export default function Footer() {
  return (
    <footer id="contact" className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>HumaniTill</h3>
            <p>
              A Maliban Biscuit Manufactories CSR initiative in partnership with Meththa Foundation.
            </p>
            <div className="social-links">
              <a href="#" className="social-link" aria-label="Facebook">
                <i className="fab fa-facebook-f" />
              </a>
              <a href="#" className="social-link" aria-label="Twitter">
                <i className="fab fa-twitter" />
              </a>
              <a href="#" className="social-link" aria-label="Instagram">
                <i className="fab fa-instagram" />
              </a>
              <a href="#" className="social-link" aria-label="LinkedIn">
                <i className="fab fa-linkedin-in" />
              </a>
            </div>
          </div>
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li>
                <a href="#about">About</a>
              </li>
              <li>
                <a href="#highlights">Project</a>
              </li>
              <li>
                <a href="#gallery">Gallery</a>
              </li>
              <li>
                <a href="#cta">Donate</a>
              </li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Partners</h4>
            <ul>
              <li>
                <a href="#">Maliban Biscuit Manufactories</a>
              </li>
              <li>
                <a href="#">Meththa Foundation</a>
              </li>
              <li>
                <a href="#">Jeewithaloka Initiative</a>
              </li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Contact</h4>
            <p>Email: info@humanitill.lk</p>
            <p>Phone: +94 11 234 5678</p>
            <p>Address: Colombo, Sri Lanka</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2025 HumaniTill. All rights reserved. | A Maliban CSR Initiative</p>
        </div>
      </div>
    </footer>
  );
}
