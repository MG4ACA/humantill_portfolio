import '../assets/styles/hero.css';

export default function Hero() {
  return (
    <section id="home" className="hero">
      <div className="hero-content">
        <div className="hero-text">
          <div className="hero-rest-container">
            <h1 className="hero-title">HumaniTill</h1>
            <h2 className="hero-subtitle">Restoring Mobility. Restoring Dignity.</h2>
            <p className="hero-description">
              A STEP TOWARDS A LIFE REGAINED
              <br />
              HumaniTill is more than a donation box, it’s a beacon of hope.
            </p>
            <p style={{ marginBottom: 10 }}>
              Designed as a life-sized, transparent human figure, it stands as a powerful reminder
              of the limbs lost to illness and accidents. Every coin, every note placed inside helps
              transform lives by providing free prosthetic limbs to those who need them most.
            </p>
            <p>
              In collaboration with the Maliban Jeewithaloka Programme and proudly supported by the
              Meththa Foundation, HumaniTill is part of a mission to restore not just movement, but
              also dignity, independence, and the ability to live life to the fullest.
            </p>
          </div>
          <div className="hero-buttons">
            <a href="#about" className="btn btn-primary">
              Learn More
            </a>
            <a href="#cta" className="btn btn-secondary">
              Join the Mission
            </a>
          </div>
        </div>
      </div>
      <div className="scroll-indicator">
        <span>Scroll to explore</span>
        <div className="scroll-arrow" />
      </div>
    </section>
  );
}
