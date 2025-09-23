import { useEffect, useState } from 'react';
import '../assets/styles/about.css';

const VIDEOS = [
  'humantill_videos_1',
  'humantill_videos_2',
  'humantill_videos_3',
  'humantill_videos_4',
];

async function checkUrlExists(url) {
  try {
    const res = await fetch(url, { method: 'HEAD' });
    return res.ok;
  } catch (e) {
    return false;
  }
}

export default function VideoGrid() {
  const [posters, setPosters] = useState({});

  // track playing state per video name so overlay visibility can be toggled
  const [playing, setPlaying] = useState({});

  useEffect(() => {
    let mounted = true;
    (async () => {
      const results = {};
      await Promise.all(
        VIDEOS.map(async (name) => {
          const posterUrl = `/videos/${name}.jpg`;
          const exists = await checkUrlExists(posterUrl);
          results[name] = exists ? posterUrl : null;
        })
      );
      if (mounted) setPosters(results);
    })();
    return () => {
      mounted = false;
    };
  }, []);

  let previousTarget = null;
  const handleVideoMouseEnter = (e) => {
    const v = e.currentTarget;

    if (previousTarget) {
      previousTarget.pause();
      previousTarget.currentTime = 0;
      previousTarget.controls = false;
    }

    v.muted = false;
    const playPromise = v.play();
    if (playPromise && typeof playPromise.then === 'function') {
      playPromise
        .then(() => {
          v.controls = true;
        })
        .catch(() => {
          // play() blocked (no user gesture). Suppress the error and leave controls hidden.
        });
    } else {
      // legacy fallback
      v.controls = true;
    }
    previousTarget = v;
  };

  const handleVideoMouseLeave = (e) => {
    const v = e.currentTarget;
    v.pause();
    v.currentTime = 0;
    v.controls = false;
    // reset the video element so the poster is shown again
    try {
      v.load();
    } catch (err) {
      // ignore
    }
    // mark as not playing so overlay reappears
    const wrapper = v.parentElement;
    if (wrapper) wrapper.classList.remove('playing');
  };

  const handleVideoPlay = (e, name) => {
    const wrapper = e.currentTarget.parentElement;
    if (wrapper) wrapper.classList.add('playing');
    setPlaying((p) => ({ ...p, [name]: true }));
  };

  const handleVideoPause = (e, name) => {
    const wrapper = e.currentTarget.parentElement;
    if (wrapper) wrapper.classList.remove('playing');
    setPlaying((p) => ({ ...p, [name]: false }));
  };

  const handleOverlayClick = (e, name) => {
    const wrapper = e.currentTarget.parentElement;
    const v = wrapper?.querySelector('video');
    if (!v) return;
    // explicit user gesture - unmute and play
    v.muted = false;
    const p = v.play();
    if (p && typeof p.then === 'function') {
      p.then(() => {
        v.controls = true;
      }).catch(() => {});
    } else {
      v.controls = true;
    }
  };

  return (
    <div className="hero-videos">
      <div className="videos-row">
        {VIDEOS.map((name) => (
          <div className="video-figure" key={name}>
            <video
              key={name}
              src={`/videos/${name}.mp4`}
              poster={posters[name] || undefined}
              muted
              loop
              playsInline
              preload="metadata"
              onMouseEnter={handleVideoMouseEnter}
              onMouseLeave={handleVideoMouseLeave}
              onPlay={(e) => handleVideoPlay(e, name)}
              onPause={(e) => handleVideoPause(e, name)}
            />
            <button
              className="video-play-overlay"
              aria-label={`Play ${name}`}
              onClick={(e) => handleOverlayClick(e, name)}
            >
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden
              >
                <circle cx="12" cy="12" r="12" fill="rgba(0,0,0,0.5)" />
                <path d="M10 8L16 12L10 16V8Z" fill="#fff" />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
