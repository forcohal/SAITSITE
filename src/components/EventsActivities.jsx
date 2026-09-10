import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calendar, Clock, MapPin, ArrowRight, ArrowUpRight, Award, ChevronDown } from 'lucide-react';
import {
  featuredEvent,
  eventCategories,
  upcomingEvents,
  flagshipEvents,
  pastEvents,
} from '../data/eventsData';
import './EventsActivities.css';

gsap.registerPlugin(ScrollTrigger);

export default function EventsActivities() {
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [showAllPast, setShowAllPast] = useState(false);

  const sectionRef      = useRef(null);
  const headerRef       = useRef(null);
  const featuredRef     = useRef(null);
  const upcomingRef     = useRef(null);
  const flagshipsRef    = useRef(null);
  const pastRef         = useRef(null);

  // Filter events based on active category
  const filteredEvents =
    activeCategory === 'ALL'
      ? upcomingEvents
      : upcomingEvents.filter((ev) => ev.category === activeCategory);

  const displayedPastEvents = showAllPast ? pastEvents : pastEvents.slice(0, 4);

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

      // 2 — Featured event reveal
      const featImage = featuredRef.current.querySelector('.events-featured-image-wrap');
      const featInfo = featuredRef.current.querySelector('.events-featured-info');

      gsap.fromTo(
        featImage,
        { clipPath: 'inset(100% 0% 0% 0%)' },
        {
          scrollTrigger: {
            trigger: featuredRef.current,
            start: 'top 80%',
            once: true,
          },
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 1.25,
          ease,
        }
      );

      gsap.from(featInfo.children, {
        scrollTrigger: {
          trigger: featuredRef.current,
          start: 'top 80%',
          once: true,
        },
        y: 30,
        opacity: 0,
        duration: 1.0,
        stagger: 0.1,
        delay: 0.15,
        ease,
      });

      // 3 — Upcoming events reveal
      gsap.from(upcomingRef.current.querySelectorAll('.events-row-item'), {
        scrollTrigger: {
          trigger: upcomingRef.current,
          start: 'top 82%',
          once: true,
        },
        y: 25,
        opacity: 0,
        duration: 0.8,
        stagger: 0.08,
        ease,
      });

      // 4 — Flagship events reveal
      gsap.from(flagshipsRef.current.querySelectorAll('.events-flagship-card'), {
        scrollTrigger: {
          trigger: flagshipsRef.current,
          start: 'top 82%',
          once: true,
        },
        y: 30,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease,
      });

      // 5 — Past events archive reveal
      gsap.from(pastRef.current.querySelectorAll('.events-past-row'), {
        scrollTrigger: {
          trigger: pastRef.current,
          start: 'top 85%',
          once: true,
        },
        y: 20,
        opacity: 0,
        duration: 0.75,
        stagger: 0.06,
        ease,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Category filter switch animation
  useEffect(() => {
    if (!upcomingRef.current) return;
    const items = upcomingRef.current.querySelectorAll('.events-row-item');
    gsap.fromTo(
      items,
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.4, stagger: 0.04, ease: 'power2.out' }
    );
  }, [activeCategory]);

  return (
    <section className="events-section" ref={sectionRef} id="events">
      <div className="events-container">

        {/* ── 1. Section Header ────────────────────────────── */}
        <header className="events-header" ref={headerRef}>
          <div className="events-header-meta gsap-reveal-header">
            <span className="events-label-num">09</span>
            <span className="events-label-divider">—</span>
            <span className="events-label-text">EVENTS &amp; ACTIVITIES</span>
          </div>

          <div className="events-header-main">
            <h2 className="events-heading gsap-reveal-header">
              What's happening<br />at SAIT?
            </h2>
            <p className="events-intro-body gsap-reveal-header">
              From technical workshops to flagship events, discover what's happening across the IT community and participate in student-led learning.
            </p>
          </div>
        </header>

        {/* ── 2. Featured Upcoming Event ───────────────────── */}
        <div className="events-featured-wrapper" ref={featuredRef}>
          <div className="events-featured-grid">
            
            {/* Left: Event Visual with Inset Border & Date Overlay */}
            <div className="events-featured-image-col">
              <div className="events-featured-image-wrap">
                <img
                  src={featuredEvent.image}
                  alt={featuredEvent.title}
                  className="events-featured-image"
                  loading="lazy"
                />
                <span className="events-image-border" aria-hidden="true" />
                <div className="events-date-tag">
                  <span className="events-date-day">{featuredEvent.dateBadge.day}</span>
                  <span className="events-date-month">{featuredEvent.dateBadge.month}</span>
                </div>
              </div>
            </div>

            {/* Right: Event Information & Registration CTA */}
            <div className="events-featured-info">
              <div className="events-badge">
                <span className="events-badge-dot" />
                <span className="events-badge-label">{featuredEvent.badge}</span>
              </div>

              <h3 className="events-featured-title">{featuredEvent.title}</h3>
              <p className="events-featured-tagline">{featuredEvent.tagline}</p>
              <p className="events-featured-desc">{featuredEvent.description}</p>

              {/* Event Metadata Highlights */}
              <div className="events-meta-grid">
                <div className="events-meta-cell">
                  <span className="events-meta-label">DATE</span>
                  <div className="events-meta-value-wrap">
                    <Calendar size={15} className="events-meta-icon" aria-hidden="true" />
                    <span className="events-meta-value">{featuredEvent.date}</span>
                  </div>
                </div>

                <div className="events-meta-cell">
                  <span className="events-meta-label">TIME</span>
                  <div className="events-meta-value-wrap">
                    <Clock size={15} className="events-meta-icon" aria-hidden="true" />
                    <span className="events-meta-value">{featuredEvent.time}</span>
                  </div>
                </div>

                <div className="events-meta-cell">
                  <span className="events-meta-label">VENUE</span>
                  <div className="events-meta-value-wrap">
                    <MapPin size={15} className="events-meta-icon" aria-hidden="true" />
                    <span className="events-meta-value">{featuredEvent.venue}</span>
                  </div>
                </div>
              </div>

              {/* Stat Pillars */}
              <div className="events-featured-stats">
                {featuredEvent.stats.map((stat, i) => (
                  <div key={i} className="events-stat-pill">
                    <span className="events-stat-val">{stat.value}</span>
                    <span className="events-stat-lbl">{stat.label}</span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="events-featured-cta-row">
                <a
                  href={featuredEvent.link}
                  className="events-btn-primary"
                  aria-label={`Register for ${featuredEvent.title}`}
                >
                  <span>{featuredEvent.ctaText}</span>
                  <ArrowRight size={17} className="events-btn-icon" aria-hidden="true" />
                </a>
                <span className="events-status-indicator">
                  <span className="events-pulse-dot" />
                  {featuredEvent.status}
                </span>
              </div>
            </div>

          </div>
        </div>

        {/* ── 3. Upcoming Events & Interactive Filter ──────── */}
        <div className="events-subsection" ref={upcomingRef}>
          <div className="events-sub-header">
            <div className="events-sub-badge">
              <span className="events-sub-num">02</span>
              <span className="events-sub-title">Upcoming Schedule</span>
            </div>
            <span className="events-count-note">
              {filteredEvents.length} {filteredEvents.length === 1 ? 'Event' : 'Events'} Listed
            </span>
          </div>

          {/* Category Filter Pills */}
          <div className="events-filter-bar" role="tablist" aria-label="Event Categories">
            {eventCategories.map((cat) => (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={activeCategory === cat}
                className={`events-filter-btn ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Compact Event Rows */}
          <div className="events-list-wrapper" role="list">
            {filteredEvents.length === 0 ? (
              <div className="events-empty-state">
                <p>No upcoming events currently scheduled under this category.</p>
              </div>
            ) : (
              filteredEvents.map((ev) => (
                <div key={ev.id} className="events-row-item" role="listitem">
                  
                  {/* Date Badge */}
                  <div className="events-row-date">
                    <span className="events-row-day">{ev.day}</span>
                    <span className="events-row-month">{ev.month}</span>
                  </div>

                  {/* Main Event Info */}
                  <div className="events-row-main">
                    <div className="events-row-meta-top">
                      <span className="events-row-category">{ev.category}</span>
                      <span className="events-row-status">{ev.status}</span>
                    </div>
                    <h4 className="events-row-title">{ev.title}</h4>
                    <div className="events-row-meta-bottom">
                      <span className="events-inline-meta">
                        <Clock size={13} aria-hidden="true" /> {ev.time}
                      </span>
                      <span className="events-meta-bullet" aria-hidden="true">•</span>
                      <span className="events-inline-meta">
                        <MapPin size={13} aria-hidden="true" /> {ev.venue}
                      </span>
                    </div>
                  </div>

                  {/* CTA Link */}
                  <div className="events-row-action">
                    <a
                      href={ev.link}
                      className="events-row-btn"
                      aria-label={`Register for ${ev.title}`}
                    >
                      <span>Register</span>
                      <ArrowUpRight size={16} className="events-row-btn-icon" aria-hidden="true" />
                    </a>
                  </div>

                </div>
              ))
            )}
          </div>
        </div>

        {/* ── 4. Flagship Events ───────────────────────────── */}
        <div className="events-subsection" ref={flagshipsRef}>
          <div className="events-sub-header">
            <div className="events-sub-badge">
              <span className="events-sub-num">03</span>
              <span className="events-sub-title">Flagship Events</span>
            </div>
            <p className="events-sub-tagline">
              Annual cornerstone traditions of the Students Association of Information Technology.
            </p>
          </div>

          <div className="events-flagship-grid">
            {flagshipEvents.map((flag) => (
              <article key={flag.id} className="events-flagship-card">
                <div className="events-flagship-image-wrap">
                  <img
                    src={flag.image}
                    alt={flag.name}
                    className="events-flagship-image"
                    loading="lazy"
                  />
                  <span className="events-image-border" aria-hidden="true" />
                  <span className="events-flagship-num">{flag.tag}</span>
                </div>

                <div className="events-flagship-content">
                  <span className="events-flagship-highlight">{flag.highlight}</span>
                  <h4 className="events-flagship-title">{flag.name}</h4>
                  <p className="events-flagship-subtitle">{flag.subtitle}</p>
                  <p className="events-flagship-desc">{flag.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* ── 5. Past Events Archive ───────────────────────── */}
        <div className="events-subsection events-past-subsection" ref={pastRef}>
          <div className="events-sub-header">
            <div className="events-sub-badge">
              <span className="events-sub-num">04</span>
              <span className="events-sub-title">Past Event Archive</span>
            </div>
            <p className="events-sub-tagline">
              A curated record of recently completed symposiums, hackathons, and technical bootcamps.
            </p>
          </div>

          <div className="events-past-table">
            <div className="events-past-header-row" aria-hidden="true">
              <span className="past-col-year">YEAR</span>
              <span className="past-col-title">EVENT</span>
              <span className="past-col-cat">CATEGORY</span>
              <span className="past-col-highlight">HIGHLIGHT</span>
            </div>

            {displayedPastEvents.map((item) => (
              <div key={item.id} className="events-past-row">
                <span className="past-col-year events-past-year">{item.year}</span>
                <span className="past-col-title events-past-title">{item.title}</span>
                <span className="past-col-cat events-past-cat">{item.category}</span>
                <span className="past-col-highlight events-past-highlight">{item.highlight}</span>
              </div>
            ))}
          </div>

          {/* Archive Expansion CTA */}
          <div className="events-archive-footer">
            <button
              type="button"
              className="events-archive-btn"
              onClick={() => setShowAllPast(!showAllPast)}
            >
              <span>{showAllPast ? 'Show Less' : 'View Full Archive'}</span>
              <ChevronDown
                size={16}
                className={`events-archive-icon ${showAllPast ? 'rotated' : ''}`}
                aria-hidden="true"
              />
            </button>
          </div>
        </div>

      </div>{/* /events-container */}
    </section>
  );
}
