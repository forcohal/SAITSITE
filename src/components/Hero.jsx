import { forwardRef } from 'react';
import './Hero.css';

const Hero = forwardRef((props, ref) => {
  return (
    <section className="hero-section" ref={ref} id="home">
      <div className="hero-content" id="hero-content">
        <h1 className="hero-title" id="hero-title">
          SAIT
        </h1>
        <p className="hero-subtitle" id="hero-subtitle">
          STUDENTS ASSOCIATION<br />
          OF INFORMATION TECHNOLOGY
        </p>
      </div>
    </section>
  );
});

Hero.displayName = 'Hero';

export default Hero;
