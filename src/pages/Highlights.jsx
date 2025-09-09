import React from 'react';
import '../assets/styles/highlights.css';

export default function Highlights() {
  React.useEffect(() => {
    const items = document.querySelectorAll('.timeline-item');
    if (!items || !items.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    items.forEach((item, index) => {
      if (index % 2 === 0) {
        item.classList.add('slide-in-left');
      } else {
        item.classList.add('slide-in-right');
      }
      observer.observe(item);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section id="highlights" className="highlights">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">PROJECT HIGHLIGHTS</h2>
          <p className="section-subtitle">How HumaniTill makes a difference</p>
        </div>

        <div className="timeline">
          <div className="timeline-item">
            <div className="timeline-icon">1</div>
            <div className="timeline-content">
              <h3>CONCEPTION &amp; DESIGN</h3>
              <p>
                A transparent, human-shaped till designed to spark empathy and inspire generosity,
                symbolizing both loss and the hope of restoration.
              </p>
            </div>
          </div>
          <div className="timeline-item">
            <div className="timeline-icon">2</div>
            <div className="timeline-content">
              <h3>PARTNERSHIP WITH METHTHA FOUNDATION</h3>
              <p>
                Together, we ensure every rupee collected turns into a high-quality prosthetic limb
                for a deserving beneficiary.
              </p>
            </div>
          </div>
          <div className="timeline-item">
            <div className="timeline-icon">3</div>
            <div className="timeline-content">
              <h3>LAUNCH AT POSON POYA</h3>
              <p>
                First unveiled during the sacred Poson Poya pilgrimage (June 10–11, 2025) at Jaya
                Sri Maha Bodhi and Ruwanwelisaya, inspiring thousands of devotees to give.
              </p>
            </div>
          </div>
          <div className="timeline-item">
            <div className="timeline-icon">4</div>
            <div className="timeline-content">
              <h3>NATIONWIDE REACH</h3>
              <p>
                Expanding across Sri Lanka from temples to shopping centers and community events,
                bringing hope and healing to more lives.
              </p>
            </div>
          </div>
        </div>

        {/* Our Impact section copied from original markup */}
        <section className="our-impact">
          <div className="container-our-impact">
            <div className="section-header">
              <h2 className="section-title">OUR IMPACT</h2>
            </div>
            <div className="about-stats">
              <div className="stat-item">
                <div className="stat-number">02</div>
                <div className="stat-label">Locations</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">41</div>
                <div className="stat-label">Hours of Engagement</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">4,871</div>
                <div className="stat-label">Donor Interactions</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">05</div>
                <div className="stat-label">Prosthetic Limbs Already Donated</div>
              </div>
            </div>
            <div className="our-impact-description">
              <span className="impact-quote">
                Every number represents a life touched, a story changed, a future regained.
              </span>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}
