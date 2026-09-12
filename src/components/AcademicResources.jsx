import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import {
  featuredResource,
  resourceCategories,
  academicResources,
} from '../data/academicResourcesData';
import { animateReveal } from '../utils/animations';
import './AcademicResources.css';

export default function AcademicResources() {
  const [activeCategory, setActiveCategory] = useState('All');
  const sectionRef    = useRef(null);
  const leftColRef    = useRef(null);
  const listRef       = useRef(null);

  const filteredResources =
    activeCategory === 'All'
      ? academicResources
      : academicResources.filter((res) => res.category === activeCategory);

  useEffect(() => {
    const ease = 'power3.out';

    const ctx = gsap.context(() => {
      // 1 — Left column intro reveal (eyebrow, heading, intro text, featured card)
      animateReveal(leftColRef.current.querySelectorAll('.gsap-reveal-left'), {
        trigger: leftColRef.current,
        start: 'top 85%',
        y: 40,
        duration: 1.0,
        stagger: 0.14,
        ease,
      });

      // 2 — Resource rows reveal with subtle stagger
      animateReveal(listRef.current.querySelectorAll('.resources-row-item'), {
        trigger: listRef.current,
        start: 'top 82%',
        y: 25,
        duration: 0.8,
        stagger: 0.05,
        ease,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Subtle stagger effect when switching categories
  useEffect(() => {
    if (!listRef.current) return;
    const items = listRef.current.querySelectorAll('.resources-row-item');
    gsap.fromTo(
      items,
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.45, stagger: 0.03, ease: 'power2.out' }
    );
  }, [activeCategory]);

  return (
    <section className="resources-section" ref={sectionRef} id="resources">
      <div className="resources-container">
        <div className="resources-grid">

          {/* ── LEFT COLUMN: Editorial Intro & Featured Portal ── */}
          <div className="resources-left-col" ref={leftColRef}>
            
            {/* Header Meta */}
            <div className="resources-header-meta gsap-reveal-left">
              <span className="resources-label-num">07</span>
              <span className="resources-label-divider">—</span>
              <span className="resources-label-text">ACADEMIC RESOURCES</span>
            </div>

            {/* Large Heading */}
            <h2 className="resources-heading gsap-reveal-left">
              Everything you need,<br />in one place.
            </h2>

            {/* Supporting Intro */}
            <p className="resources-intro-body gsap-reveal-left">
              Quick access to academic information, learning resources and essential student services for the Department of Information Technology.
            </p>

            {/* Featured Resource Block — Burgundy Emphasis */}
            <div className="resources-featured-card gsap-reveal-left">
              <div className="resources-featured-top">
                <span className="resources-featured-badge">
                  {featuredResource.badge}
                </span>
                <span className="resources-featured-cat">
                  {featuredResource.category}
                </span>
              </div>

              <h3 className="resources-featured-title">
                {featuredResource.title}
              </h3>

              <p className="resources-featured-desc">
                {featuredResource.description}
              </p>

              <a
                href={featuredResource.link}
                className="resources-featured-cta"
                aria-label={`Open ${featuredResource.title}`}
              >
                <span>{featuredResource.ctaText}</span>
                <ArrowRight size={18} className="resources-featured-icon" aria-hidden="true" />
              </a>
            </div>

            {/* Category Filter Pills */}
            <div className="resources-categories-wrapper gsap-reveal-left">
              <span className="resources-filter-label">FILTER BY CATEGORY</span>
              <div className="resources-categories-list" role="tablist">
                {resourceCategories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    role="tab"
                    aria-selected={activeCategory === cat}
                    className={`resources-category-btn ${
                      activeCategory === cat ? 'active' : ''
                    }`}
                    onClick={() => setActiveCategory(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

          </div>{/* /resources-left-col */}

          {/* ── RIGHT COLUMN: Vertically Stacked Editorial Directory ── */}
          <div className="resources-right-col" ref={listRef}>
            <div className="resources-list-header">
              <span className="resources-list-count">
                SHOWING {filteredResources.length} {filteredResources.length === 1 ? 'RESOURCE' : 'RESOURCES'}
              </span>
              <span className="resources-list-guide">CLICK TO ACCESS</span>
            </div>

            <div className="resources-items-wrapper" role="list">
              {filteredResources.map((item, index) => {
                const formattedNum = String(index + 1).padStart(2, '0');
                return (
                  <a
                    key={item.id}
                    href={item.link}
                    className="resources-row-item"
                    role="listitem"
                  >
                    {/* Index Number */}
                    <span className="resources-row-num" aria-hidden="true">
                      {formattedNum}
                    </span>

                    {/* Content Block */}
                    <div className="resources-row-content">
                      <span className="resources-row-category">{item.category}</span>
                      <h4 className="resources-row-title">{item.title}</h4>
                      <p className="resources-row-desc">{item.description}</p>
                    </div>

                    {/* Interactive Arrow Indicator */}
                    <div className="resources-row-arrow-wrap" aria-hidden="true">
                      <ArrowUpRight size={18} className="resources-row-arrow" />
                    </div>
                  </a>
                );
              })}
            </div>
          </div>{/* /resources-right-col */}

        </div>{/* /resources-grid */}
      </div>{/* /resources-container */}
    </section>
  );
}
