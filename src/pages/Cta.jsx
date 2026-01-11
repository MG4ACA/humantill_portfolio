import { useEffect, useRef, useState } from 'react';
import '../assets/styles/cta.css';

export default function Cta() {
  const rootRef = useRef(null);
  const [showAccountDetails, setShowAccountDetails] = useState(false);

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
            <button
              className="btn btn-primary btn-large pulse"
              onClick={() => setShowAccountDetails(!showAccountDetails)}
            >
              Donate Now
            </button>
            {/* <button className="btn btn-secondary btn-large">Volunteer</button> */}
          </div>

          {showAccountDetails && (
            <div className="account-details-inline">
              <h3>Bank Account Details</h3>
              <div className="account-info">
                <p>
                  <strong>Organization:</strong> Meththa Rehabilitation Foundation
                </p>
                <p>
                  <strong>Bank:</strong> Bank of Ceylon - Maho Branch
                </p>
                <p>
                  <strong>Account Number:</strong> <span className="account-number">83706522</span>
                </p>
                <p>
                  <strong>Referance:</strong>{' '}
                  <span className="account-number"> HUMANITILL_Name(HUMANITILL_Ranga)</span>
                </p>
              </div>
            </div>
          )}

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
