import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, TrendingUp, Briefcase, BookOpen } from 'lucide-react';
import {
  placementStats,
  placementTrends,
  mockRecruiters,
  careerResources,
  placementDisclaimer,
} from '../data/careersData';
import './PlacementsCareers.css';

gsap.registerPlugin(ScrollTrigger);

export default function PlacementsCareers() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const statsRef = useRef(null);
  const visualRef = useRef(null);
  const recruitersRef = useRef(null);
  const resourcesRef = useRef(null);

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

      // 2 — Placement stats reveal
      gsap.from(statsRef.current.querySelectorAll('.careers-stat-cell'), {
        scrollTrigger: {
          trigger: statsRef.current,
          start: 'top 85%',
          once: true,
        },
        y: 30,
        opacity: 0,
        duration: 0.9,
        stagger: 0.1,
        ease,
      });

      // 3 — Visualization trend bars reveal
      gsap.from(visualRef.current.querySelectorAll('.careers-trend-bar-fill'), {
        scrollTrigger: {
          trigger: visualRef.current,
          start: 'top 82%',
          once: true,
        },
        scaleY: 0,
        transformOrigin: 'bottom',
        duration: 1.1,
        stagger: 0.12,
        ease: 'power2.out',
      });

      // 4 — Recruiters reveal
      gsap.from(recruitersRef.current.querySelectorAll('.careers-recruiter-card'), {
        scrollTrigger: {
          trigger: recruitersRef.current,
          start: 'top 85%',
          once: true,
        },
        y: 20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.07,
        ease,
      });

      // 5 — Career resources reveal
      gsap.from(resourcesRef.current.querySelectorAll('.careers-resource-item'), {
        scrollTrigger: {
          trigger: resourcesRef.current,
          start: 'top 85%',
          once: true,
        },
        y: 25,
        opacity: 0,
        duration: 0.85,
        stagger: 0.08,
        ease,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="careers-section" ref={sectionRef} id="careers">
      <div className="careers-container">

        {/* ── 1. Section Header ────────────────────────────── */}
        <header className="careers-header" ref={headerRef}>
          <div className="careers-header-meta gsap-reveal-header">
            <span className="careers-label-num">10</span>
            <span className="careers-label-divider">—</span>
            <span className="careers-label-text">PLACEMENTS &amp; CAREERS</span>
            <span className="careers-badge-prototype">Sample Data</span>
          </div>

          <div className="careers-header-main">
            <h2 className="careers-heading gsap-reveal-header">
              From classroom to career.
            </h2>
            <p className="careers-intro-body gsap-reveal-header">
              Explore placement highlights, career opportunities and resources that help students take their next step.
            </p>
          </div>
        </header>

        {/* ── 2. Placement Statistics Row ──────────────────── */}
        <div className="careers-stats-wrapper" ref={statsRef}>
          <div className="careers-stats-grid">
            {placementStats.map((stat, idx) => (
              <div
                key={stat.id}
                className={`careers-stat-cell ${idx % 2 === 1 ? 'accent-burgundy' : 'accent-green'}`}
              >
                <div className="careers-stat-num">{stat.value}</div>
                <div className="careers-stat-label">{stat.label}</div>
                <p className="careers-stat-context">{stat.context}</p>
              </div>
            ))}
          </div>
          <div className="careers-stats-footnote">
            <span className="careers-footnote-indicator" aria-hidden="true" />
            <span>{placementDisclaimer}</span>
          </div>
        </div>

        {/* ── 3. Visual Data & Recruiters Split ────────────── */}
        <div className="careers-insights-grid">

          {/* Left: Trend Visualization */}
          <div className="careers-panel careers-visualization-panel" ref={visualRef}>
            <div className="careers-panel-header">
              <div className="careers-panel-eyebrow">
                <TrendingUp size={15} className="careers-panel-icon" aria-hidden="true" />
                <span>PLACEMENT RATE PROGRESSION</span>
              </div>
              <h3 className="careers-panel-title">Four-Year Cohort Trend</h3>
            </div>

            <p className="careers-panel-desc">
              Visualizing placement rate consistency across recent graduation years (sample prototype metrics).
            </p>

            {/* Visual Bar Chart */}
            <div className="careers-chart-wrapper" aria-label="Placement trend chart 2023 to 2026">
              <div className="careers-chart-axes">
                <div className="careers-chart-gridlines">
                  <div className="chart-gridline"><span>100%</span></div>
                  <div className="chart-gridline"><span>75%</span></div>
                  <div className="chart-gridline"><span>50%</span></div>
                  <div className="chart-gridline"><span>25%</span></div>
                </div>

                <div className="careers-chart-bars">
                  {placementTrends.map((pt) => {
                    const heightPercent = `${pt.rate}%`;
                    return (
                      <div key={pt.year} className="careers-trend-col">
                        <div className="careers-trend-value">{pt.label}</div>
                        <div className="careers-trend-track">
                          <div
                            className="careers-trend-bar-fill"
                            style={{ height: heightPercent }}
                          />
                        </div>
                        <div className="careers-trend-year">{pt.year}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="careers-chart-legend">
              <span className="legend-dot" aria-hidden="true" />
              <span>Sample annual placement rate (% of eligible candidates placed)</span>
            </div>
          </div>

          {/* Right: Recruiters & Opportunities */}
          <div className="careers-panel careers-recruiters-panel" ref={recruitersRef}>
            <div className="careers-panel-header">
              <div className="careers-panel-eyebrow">
                <Briefcase size={15} className="careers-panel-icon" aria-hidden="true" />
                <span>RECRUITERS &amp; OPPORTUNITIES</span>
              </div>
              <h3 className="careers-panel-title">Sample Hiring Network</h3>
            </div>

            <p className="careers-panel-desc">
              Prototype illustration of industry partner profiles engaging with student talent across engineering verticals.
            </p>

            <div className="careers-recruiters-grid">
              {mockRecruiters.map((rec) => (
                <div key={rec.id} className="careers-recruiter-card">
                  <div className="recruiter-name-wrap">
                    <h4 className="recruiter-name">{rec.name}</h4>
                    <span className="recruiter-tag">Hiring Partner</span>
                  </div>
                  <p className="recruiter-domain">{rec.domain}</p>
                </div>
              ))}
            </div>

            <div className="careers-recruiter-note">
              <span>Note: Company titles represent mock prototype entities for challenge exhibition only.</span>
            </div>
          </div>

        </div>

        {/* ── 4. Career Resources List ─────────────────────── */}
        <div className="careers-resources-section" ref={resourcesRef}>
          <div className="careers-resources-header">
            <div className="careers-resources-meta">
              <BookOpen size={16} className="careers-res-icon" aria-hidden="true" />
              <span className="careers-resources-eyebrow">STUDENT PATHWAYS</span>
            </div>
            <h3 className="careers-resources-heading">Career Development Resources</h3>
            <p className="careers-resources-subtitle">
              Comprehensive guidance modules designed to support students through technical preparation, portfolio craft, and industry transitions.
            </p>
          </div>

          <div className="careers-resources-list" role="list">
            {careerResources.map((res, index) => (
              <a
                key={res.id}
                href={res.link}
                className="careers-resource-item"
                role="listitem"
                aria-label={`${res.title} — ${res.description}`}
              >
                <div className="res-item-left">
                  <span className="res-item-number" aria-hidden="true">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div className="res-item-text">
                    <h4 className="res-item-title">{res.title}</h4>
                    <p className="res-item-desc">{res.description}</p>
                  </div>
                </div>

                <div className="res-item-action" aria-hidden="true">
                  <span className="res-item-cta-label">Explore</span>
                  <ArrowUpRight size={18} className="res-item-arrow" />
                </div>
              </a>
            ))}
          </div>
        </div>

      </div>{/* /careers-container */}
    </section>
  );
}
