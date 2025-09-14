import { useEffect, useRef } from 'react';
import '../assets/styles/cta.css';

export default function Cta() {
  const rootRef = useRef(null);

  useEffect(() => {
    const node = rootRef.current;
    if (!node) return;

    // Respect user motion preferences
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      node.classList.add('cta-animate--visible');
      return;
    }

    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            node.classList.add('cta-animate--visible');
          } else {
            // remove so animation can replay when element re-enters
            node.classList.remove('cta-animate--visible');
          }
        }
      },
      { threshold: 0.15 }
    );

    obs.observe(node);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="cta" className="cta">
      <div className="container">
        <div className="cta-content" ref={rootRef}>
          <h2 className="cta-title">Join the Mission</h2>
          <p className="cta-copy">
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
