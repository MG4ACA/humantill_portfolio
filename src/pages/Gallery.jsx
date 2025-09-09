import { useEffect, useRef, useState } from 'react';
import '../assets/styles/gallery.css';

const galleryItems = [
  {
    image: '/images/carosal-01.jpg',
  },
  {
    image: '/images/carosal-02.JPG',
  },
  {
    image: '/images/carosal-03.JPG',
  },
  {
    image: '/images/carosal-04.JPG',
  },
  {
    image: '/images/carosal-05.jpg',
  },
  {
    image: '/images/carosal-06.jpg',
  },
];

export default function Gallery() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [infoOpacity, setInfoOpacity] = useState(1);
  const intervalRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const containerRef = useRef(null);

  const cardsCount = galleryItems.length;

  function updateCarousel(newIndex) {
    if (isAnimating) return;
    setIsAnimating(true);

    const wrapped = (newIndex + cardsCount) % cardsCount;
    // fade out info
    setInfoOpacity(0);
    setTimeout(() => {
      setCurrentIndex(wrapped);
      setInfoOpacity(1);
    }, 300);

    // clear animating flag after CSS transition window (matches original 800ms)
    setTimeout(() => setIsAnimating(false), 800);
  }

  function prev() {
    updateCarousel(currentIndex - 1);
  }

  function next() {
    updateCarousel(currentIndex + 1);
  }

  useEffect(() => {
    // keyboard navigation
    function onKey(e) {
      if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA')) return;
      if (e.key === 'ArrowLeft' || e.key === 'Left') {
        e.preventDefault();
        prev();
      } else if (e.key === 'ArrowRight' || e.key === 'Right') {
        e.preventDefault();
        next();
      } else if (/^[1-6]$/.test(e.key)) {
        const index = parseInt(e.key, 10) - 1;
        if (index < cardsCount) updateCarousel(index);
      }
    }

    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex, isAnimating]);

  useEffect(() => {
    // auto-rotate
    function startAutoRotate() {
      stopAutoRotate();
      intervalRef.current = setInterval(() => {
        updateCarousel((currentIndex + 1) % cardsCount);
      }, 5000);
    }

    function stopAutoRotate() {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    startAutoRotate();

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mouseenter', stopAutoRotate);
      container.addEventListener('mouseleave', startAutoRotate);
    }

    return () => {
      stopAutoRotate();
      if (container) {
        container.removeEventListener('mouseenter', stopAutoRotate);
        container.removeEventListener('mouseleave', startAutoRotate);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex, isAnimating]);

  // Touch handlers
  function handleTouchStart(e) {
    touchStartX.current = e.changedTouches[0].screenX;
  }

  function handleTouchEnd(e) {
    touchEndX.current = e.changedTouches[0].screenX;
    const diff = touchStartX.current - touchEndX.current;
    const swipeThreshold = 50;
    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) updateCarousel(currentIndex + 1);
      else updateCarousel(currentIndex - 1);
    }
  }

  // helper to compute class for a card by index
  function cardClass(i) {
    const offset = (i - currentIndex + cardsCount) % cardsCount;
    if (offset === 0) return 'card center';
    if (offset === 1) return 'card right-1';
    if (offset === 2) return 'card right-2';
    if (offset === cardsCount - 1) return 'card left-1';
    if (offset === cardsCount - 2) return 'card left-2';
    return 'card hidden';
  }

  return (
    <section id="gallery" className="gallery">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title gallery-title">GALLERY</h2>
          <p className="section-subtitle">Moments of hope and compassion</p>
        </div>

        <div className="dots" aria-hidden={false}>
          {galleryItems.map((_, i) => (
            <div
              key={i}
              role="button"
              tabIndex={0}
              aria-label={`Go to image ${i + 1}`}
              className={i === currentIndex ? 'dot active' : 'dot'}
              onClick={() => updateCarousel(i)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') updateCarousel(i);
              }}
            />
          ))}
        </div>

        <div
          className="carousel-container"
          ref={containerRef}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div className="carousel-track">
            {galleryItems.map((item, i) => (
              <div
                key={i}
                className={cardClass(i)}
                onClick={() => updateCarousel(i)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') updateCarousel(i);
                }}
              >
                <img src={item.image} alt={item.name} />
              </div>
            ))}
          </div>

          <button
            className="nav-arrow left"
            onClick={prev}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') prev();
            }}
            aria-label="Previous"
          >
            ‹
          </button>
          <button
            className="nav-arrow right"
            onClick={next}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') next();
            }}
            aria-label="Next"
          >
            ›
          </button>
        </div>
      </div>
    </section>
  );
}
