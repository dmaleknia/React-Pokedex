import React, { useState, useEffect } from 'react';

const RetryImage = ({ src, alt, retries = 3, delay = 1000 }) => {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [attempt, setAttempt] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (attempt > 0 && attempt <= retries) {
      const timer = setTimeout(() => {
        setCurrentSrc(`${src}?retry=${attempt}`);
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [attempt, src, retries, delay]);

  const handleError = () => {
    if (attempt < retries) {
      setAttempt(attempt + 1);
    }
  };

  const handleLoad = () => {
    setLoaded(true);
  };

  return (
    <div>
      {!loaded && <div>Loading...</div>}
      <img src={currentSrc} alt={alt} onError={handleError} onLoad={handleLoad} style={{ display: loaded ? 'block' : 'none' }} />
    </div>
  );
};

export default RetryImage;

