import { forwardRef, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { statsData } from '../data/statsData';
import CTA from './CTA';
import './Stats.css';

gsap.registerPlugin(ScrollTrigger);

// ── Individual animated stat ──────────────────────────────────────────────────
function AnimatedStat({ target, suffix, label, colorClass }) {
  const numRef = useRef(null);

  useEffect(() => {
    const el = numRef.current;
    if (!el) return;

    // Proxy object that GSAP will tween — keep reference in closure
    const counter = { value: 0 };

    // Write initial "0+" to DOM immediately
    el.textContent = '0' + suffix;

    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top 88%',
      fastScrollEnd: true,
      onEnter: () => {
        gsap.to(counter, {
          value: target,
          duration: 1.8,
          ease: 'power2.out',
          onUpdate: () => {
            el.textContent = Math.round(counter.value) + suffix;
          },
          onComplete: () => {
            el.textContent = target + suffix;
          },
        });
      },
      onLeave: () => {
        el.textContent = target + suffix;
      },
    });

    return () => {
      st.kill();
    };
  }, [target, suffix]);

  return (
    <div className="stat-item">
      <span ref={numRef} className={`stat-number ${colorClass}`}>
        0{suffix}
      </span>
      <span className="stat-label">{label}</span>
    </div>
  );
}

// ── Stats section ─────────────────────────────────────────────────────────────
const Stats = forwardRef(({ className = '' }, ref) => {
  return (
    <section className={`stats-section container ${className}`} id="stats-section" ref={ref}>
      <h2 className="stats-header">SAIT AT A GLANCE</h2>

      <div className="stats-grid">
        {statsData.map((stat) => (
          <AnimatedStat key={stat.id} {...stat} />
        ))}
      </div>

      <div className="stats-cta-wrapper">
        <CTA />
      </div>
    </section>
  );
});

Stats.displayName = 'Stats';

export default Stats;
