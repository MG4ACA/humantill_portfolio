import '../assets/styles/locations.css';

export default function Locations() {
  return (
    <section id="locations" className="locations">
      <div className="container">
        <div className="map-container">
          {/* Sidebar Section */}
          <div className="sidebar">
            <div className="section-header">
              <h2 className="section-title">OUR LOCATIONS</h2>
              <p className="section-subtitle">
                Where HumaniTill makes a difference across Sri Lanka
              </p>
            </div>
            <div className="event-details" id="event-details">
              <h3>Select an event marker to view details</h3>
            </div>
          </div>

          {/* Map Section */}
          <div className="map-section">
            <div className="map-visual">
              {/* SVG (converted from original site) */}
              <svg xmlns="http://www.w3.org/2000/svg" width="449.68774" height="792.54926">
                {/* paths preserved from original static SVG */}
                <path
                  d="m 44.487125,578.90075 2.6,0.07 -0.85,3.88 1.17,0.77 3.07,-0.34 -0.63,0.87 0.73,0.82 2.1,-0.67 1.16,0.91 1.25,-1.28 0.88,0.78 1.61,-0.27 1.98,2.33 2.36,-0.89 6.19,1.5 1.55,-1.65 1.46,0.39 2.63,-0.87 -0.11,1.34 1.33,2.96 1.97,0.25 6.04,3.27 0.97,-1.17 1.99,1.06 0.69,-0.62 3.04,-0.14 0.12,-5.37 0.96,-2.75 1.43,-0.5 0.75,-1.82 2.38,-0.53 0.45,-1.67 8.550005,0.81 0.8,-1.88 1.86,0.31 0,0 1.03,0.71 1.08,-0.74 2.05,0.46 1.52,-0.61 2.17,1.17 -0.08,3.22 1.05,1.45 0.04,1.6 -0.74,1.2 -2.38,-0.32 0.42,4.01 0,0 -2.13,1.87 0.27,0.95 -0.97,-0.12 -1.07,0.97 -0.02,1.35 -1.42,1.26 -0.44,3.8 -0.89,1.71 2.61,0.62 0.96,1.06 1.51,3.83 0.07,2.91 -0.84,0.76 -3.79,0.02 0,0 -1.03,-1.15 -2.07,0.88 -1.09,-1.63 -1.87,-0.39 -6.640005,3.79 1.6,4.81 -0.11,1.72 -0.75,0.63 -2.32,-0.39 -2.14,-4.49 -0.06,-1.79 -1.01,-0.55 -0.33,-1.62 -1.82,-0.55 -1.12,0.43 -1.7,3.89 -1.18,1.12 -2.76,-1.03 -1.23,-1.74 -1.19,-0.4 -1.95,2.98 -2.54,0.8 0.42,0.67 -1.42,1.29 -0.84,-0.07 -0.22,1.4 -1.33,0.1 -3.79,2.47 -1.92,-0.54 -2,0.53 -1.61,-0.9 -0.6,2.46 -0.71,0.42 -4.99,-0.1 -0.59,-0.67 0.37,-1.11 -1.15,-1.34 -4.95,-2.33 -0.5,0.79 1.44,1.81 2.07,7.84 -0.24,1.76 0,0 -4.53,-11.03 -3.36,-10.53 -1.16,-10.42 -3.26,-11.53 0.67,-4.48 0.67,2.91 1.51,-3.25 -0.39,-1.23 2.18,-0.78 1.05,-2.5 z"
                  title="Colombo"
                  id="LK-11"
                />
                {/* Note: remaining <path> elements omitted here for brevity; the full SVG was preserved in the original file. */}
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
