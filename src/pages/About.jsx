import { useEffect } from 'react';
import '../assets/styles/about.css';

export default function About() {
  useEffect(() => {
    const section = document.querySelector('.about-stats');
    if (!section) return;

    const counters = section.querySelectorAll('.stat-number');
    const timers = [];

    function animateCounters() {
      counters.forEach((counter) => {
        const original = counter.textContent.trim();
        const target = parseInt(original.replace(/,/g, ''), 10);
        const hasComma = original.includes(',');
        const leadingZeros = original.match(/^0+/);
        const increment = Math.max(1, Math.floor(target / 100));
        let current = 0;

        const formatNumber = (num) => {
          let str = Math.floor(num).toString();
          if (leadingZeros) {
            str = leadingZeros[0] + str;
          }
          if (hasComma) {
            str = str.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
          }
          return str;
        };

        const updateCounter = () => {
          if (current < target) {
            current += increment;
            counter.textContent = formatNumber(current);
            const t = setTimeout(updateCounter, 20);
            timers.push(t);
          } else {
            counter.textContent = original;
          }
        };

        updateCounter();
      });
    }

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounters();
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    obs.observe(section);

    return () => {
      obs.disconnect();
      timers.forEach((t) => clearTimeout(t));
    };
  }, []);

  return (
    <>
      <section id="about" className="about">
        <div className="container">
          <div className="about-content">
            <div className="about-text">
              <h1>WHY HUMANITILL MATTERS?</h1>
              <p>
                Every donation tells a story of generosity, compassion, and transformation. When you
                give, you're helping someone walk to work again, hold their child's hand, or stand
                tall with confidence. It's not just about prosthetics; it's about giving back the
                gift of mobility.
              </p>

              <div className="quote-section">
                <blockquote>
                  To restore mobility, dignity, and independence to those who have lost their limbs,
                  completely free of charge.
                </blockquote>
                <cite>OUR MISSION</cite>
              </div>
              <div className="quote-section">
                <blockquote>
                  A Sri Lanka where every step is possible, every dream is within reach, and every
                  person has the freedom to move forward.
                </blockquote>
                <cite>OUR VISION</cite>
              </div>
            </div>
            <div className="about-image">
              <img
                src="/images/main-image.png"
                alt="HumaniTill - Human-shaped donation box"
                className="about-main-image"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Meththa foundation section copied from original site */}
      <section className="about-meththa-foundation">
        <div className="about-meththa-content">
          <div>
            <img
              src="/images/logos/meththa-logo.png"
              alt="meththa-logo"
              className="w-[16vw] pb-[2rem]"
            />
          </div>
          <div className="about-meththa-content-inner">
            <h2 className="section-title-about-meththa-foundation">ABOUT MALIBAN JEEWITHALOKA</h2>
            <p>
              Jeewithaloka is Maliban's social responsibility initiative focused on community
              development, education, and humanitarian causes. In partnership with HumaniTill,
              Jeewithaloka supports awareness, volunteer mobilization, and fundraising to ensure
              sustained impact across the country.
            </p>
          </div>
          <div className="about-meththa-content-inner">
            <h2 className="section-title-about-meththa-foundation">ABOUT METHTHA FOUNDATION</h2>
            <p>
              The Meththa Foundation is a non-profit organization devoted to providing prosthetic
              limbs to those who cannot afford them. With a commitment to innovation, quality, and
              compassionate service, Meththa has transformed thousands of lives by restoring
              mobility and independence. As a trusted partner of HumaniTill, Meththa ensures that
              every donation translates into high-quality prosthetics and ongoing care for
              beneficiaries across Sri Lanka.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
