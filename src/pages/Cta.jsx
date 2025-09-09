import '../assets/styles/cta.css';

export default function Cta() {
  return (
    <section id="cta" className="cta">
      <div className="container">
        <div className="cta-content">
          <h2>Join the Mission</h2>
          <p>
            Be part of restoring hope and mobility to those who need it most. Every contribution
            makes a difference in someone's life.
          </p>

          <div className="cta-buttons">
            <button className="btn btn-primary btn-large pulse">Donate Now</button>
            <button className="btn btn-secondary btn-large">Volunteer</button>
          </div>

          <div className="cta-info">
            <p>
              Your donation helps provide prosthetic limbs and restore independence to individuals
              across Sri Lanka.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
