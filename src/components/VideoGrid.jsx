import React, { useEffect, useState } from 'react';
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

  const handleVideoMouseEnter = (e) => {
    const v = e.currentTarget;
    // Ensure the video is muted so browsers allow autoplay in most cases
    v.muted = true;
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
  };

  const handleVideoMouseLeave = (e) => {
    const v = e.currentTarget;
    v.pause();
    v.currentTime = 0;
    v.controls = false;
  };

  return (
    <div className="hero-videos">
      <div className="videos-row">
        {VIDEOS.map((name) => (
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
          />
        ))}
      </div>
    </div>
  );
}
