import { useRef, useState } from 'react';
import '../assets/styles/hero.css';

export default function Hero() {
  const scrollIndicatorRef = useRef(null);
  const [titleText, setTitleText] = useState('');

  return (
    <section id="home" className="hero">
      <div className="hero-content">
        <div className="hero-text">
          <div className="hero-rest-container">
            <div className="humani-till-logo-container">
              <img src="/images/logos/humantill-logo.png" alt="HumaniTill logo" />
            </div>
            <h2 className="hero-subtitle py-[1rem]">
              <strong>Restoring Mobility. Restoring Dignity.</strong>
            </h2>
            <h2 className="py-[0.5rem]">
              <strong> A STEP TOWARDS A LIFE REGAINED .</strong>
            </h2>
            <p className="hero-description">
              HumaniTill is more than a donation box, it's a beacon of hope.
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
            <a href="#cta" className="btn btn-primary mr-[1rem] pulse-hero">
              Join the Mission
            </a>
            <a href="#about" className="btn btn-secondary">
              Learn More
            </a>
          </div>
        </div>
      </div>
      <div ref={scrollIndicatorRef} className="scroll-indicator">
        <span>Scroll to explore</span>
        <div className="scroll-arrow" />
      </div>
    </section>
  );
}
