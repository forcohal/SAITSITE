import { ArrowRight } from 'lucide-react';
import './CTA.css';

export default function CTA() {
  return (
    <div className="cta-container">
      <button className="cta-btn primary">
        <span>Explore Events</span>
        <ArrowRight size={20} className="cta-icon" />
      </button>
      
      <button className="cta-btn secondary">
        <span>Discover SAIT</span>
        <ArrowRight size={20} className="cta-icon" />
      </button>
    </div>
  );
}
