import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Trophy, Award, Sparkles, Filter } from 'lucide-react';
import {
  hallOfFameDisclaimer,
  hallOfFameCategories,
  featuredAchievement,
  achievementTimeline,
} from '../data/hallOfFameData';
import './HallOfFame.css';

gsap.registerPlugin(ScrollTrigger);

export default function HallOfFame() {
  const [activeCategory, setActiveCategory] = useState('ALL');

  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const featuredRef = useRef(null);
  const filterRef = useRef(null);
  const timelineRef = useRef(null);

  const filteredAchievements =
    activeCategory === 'ALL'
      ? achievementTimeline
      : achievementTimeline.filter((item) => item.category === activeCategory);

  useEffect(() => {
    const ease = 'power3.out';

    const ctx = gsap.context(() => {
      // 1 — Section header reveal
      gsap.from(headerRef.current.querySelectorAll('.gsap-reveal-header'), {
        scrollTrigger: {
          trigger: headerRef.current,
          start: 'top 85%',
          once: true,
        },
        y: 40,
        opacity: 0,
        duration: 1.0,
        stagger: 0.14,
        ease,
      });

      // 2 — Featured achievement reveal
      const featCard = featuredRef.current.querySelector('.hof-featured-card');
      gsap.from(featCard, {
        scrollTrigger: {
          trigger: featuredRef.current,
          start: 'top 82%',
          once: true,
        },
        y: 35,
        opacity: 0,
        duration: 1.1,
        ease,
      });

      // 3 — Timeline items reveal
      gsap.from(timelineRef.current.querySelectorAll('.hof-timeline-row'), {
        scrollTrigger: {
          trigger: timelineRef.current,
          start: 'top 85%',
          once: true,
        },
        y: 25,
        opacity: 0,
        duration: 0.8,
        stagger: 0.08,
        ease,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Filter transition animation
  useEffect(() => {
    if (!timelineRef.current) return;
    const rows = timelineRef.current.querySelectorAll('.hof-timeline-row');
    gsap.fromTo(
      rows,
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.4, stagger: 0.04, ease: 'power2.out' }
    );
  }, [activeCategory]);

  return (
    <section className="hof-section" ref={sectionRef} id="hall-of-fame">
      <div className="hof-container">

        {/* ── 1. Section Header ────────────────────────────── */}
        <header className="hof-header" ref={headerRef}>
          <div className="hof-header-meta gsap-reveal-header">
            <span className="hof-label-num">12</span>
            <span className="hof-label-divider">—</span>
            <span className="hof-label-text">ACHIEVEMENTS</span>
            <span className="hof-badge-prototype">Prototype Records</span>
          </div>

          <div className="hof-header-main">
            <h2 className="hof-heading gsap-reveal-header">
              HALL OF FAME
            </h2>
            <p className="hof-intro-body gsap-reveal-header">
              Celebrating the students and teams who turn ideas into achievements.
            </p>
          </div>
        </header>

        {/* ── 2. Featured Achievement (Burgundy Emphasis) ─── */}
        <div className="hof-featured-wrapper" ref={featuredRef}>
          <article className="hof-featured-card">
            <div className="hof-featured-inner">

              {/* Header meta badge */}
              <div className="hof-featured-meta-row">
                <div className="hof-featured-tag-wrap">
                  <Sparkles size={14} className="hof-featured-sparkle" aria-hidden="true" />
                  <span className="hof-featured-tag">{featuredAchievement.tag}</span>
                </div>
                <div className="hof-featured-badges">
                  <span className="hof-featured-year">{featuredAchievement.year}</span>
                  <span className="hof-featured-cat">{featuredAchievement.category}</span>
                </div>
              </div>

              {/* Title & Team */}
              <h3 className="hof-featured-title">
                {featuredAchievement.title}
              </h3>
              <div className="hof-featured-team">
                <Trophy size={16} className="hof-trophy-icon" aria-hidden="true" />
                <span>{featuredAchievement.team}</span>
              </div>

              {/* Description */}
              <p className="hof-featured-desc">
                {featuredAchievement.description}
              </p>

              {/* Metric Highlights */}
              <div className="hof-featured-metrics">
                {featuredAchievement.metrics.map((m, i) => (
                  <div key={i} className="hof-metric-pill">
                    <span className="hof-metric-val">{m.value}</span>
                    <span className="hof-metric-lbl">{m.label}</span>
                  </div>
                ))}
              </div>

            </div>
          </article>
        </div>

        {/* ── 3. Filters & Achievement Timeline ────────────── */}
        <div className="hof-timeline-section">
          
          <div className="hof-timeline-controls" ref={filterRef}>
            <div className="hof-timeline-header-block">
              <span className="hof-sub-label">RECORD ARCHIVE</span>
              <h3 className="hof-sub-heading">Achievement Timeline</h3>
            </div>

            {/* Category Filter Pills */}
            <div className="hof-filter-bar" role="tablist" aria-label="Achievement Categories">
              <div className="hof-filter-legend">
                <Filter size={13} aria-hidden="true" />
                <span>Filter:</span>
              </div>
              {hallOfFameCategories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  role="tab"
                  aria-selected={activeCategory === cat}
                  className={`hof-filter-btn ${activeCategory === cat ? 'active' : ''}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Editorial Vertical Timeline */}
          <div className="hof-timeline-wrapper" ref={timelineRef} role="list">
            {filteredAchievements.length === 0 ? (
              <div className="hof-empty-state">
                <p>No achievements recorded in this category yet.</p>
              </div>
            ) : (
              filteredAchievements.map((item) => (
                <article key={item.id} className="hof-timeline-row" role="listitem">
                  
                  {/* Left Column: Year & Category */}
                  <div className="hof-time-col">
                    <span className="hof-time-year">{item.year}</span>
                    <span className="hof-time-category">{item.category}</span>
                  </div>

                  {/* Node marker */}
                  <div className="hof-time-node" aria-hidden="true">
                    <span className="hof-node-dot" />
                    <span className="hof-node-line" />
                  </div>

                  {/* Right Column: Title, Highlight & Description */}
                  <div className="hof-time-content">
                    <div className="hof-content-header">
                      <h4 className="hof-content-title">{item.title}</h4>
                      <span className="hof-content-highlight">
                        <Award size={13} aria-hidden="true" />
                        {item.highlight}
                      </span>
                    </div>

                    <p className="hof-content-desc">{item.description}</p>
                    <span className="hof-content-team">{item.team}</span>
                  </div>

                </article>
              ))
            )}
          </div>

          <div className="hof-footnote">
            <span className="hof-footnote-dot" aria-hidden="true" />
            <span>{hallOfFameDisclaimer}</span>
          </div>

        </div>

      </div>{/* /hof-container */}
    </section>
  );
}
