import { ArrowRight } from 'lucide-react';
import { scrollToSection } from '../utils/navigation';
import './CTA.css';

export default function CTA() {
  return (
    <div className="cta-container">
      <button
        type="button"
        className="cta-btn primary"
        onClick={() => scrollToSection('events')}
        aria-label="Explore Events"
      >
        <span>Explore Events</span>
        <ArrowRight size={20} className="cta-icon" />
      </button>

      <button
        type="button"
        className="cta-btn secondary"
        onClick={() => scrollToSection('about')}
        aria-label="Discover SAIT"
      >
        <span>Discover SAIT</span>
        <ArrowRight size={20} className="cta-icon" />
      </button>
    </div>
  );
}
