import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './VisionMission.css';

gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────────────────────────────────────────────────────────
   Official CUSAT Information Technology Division Vision & Mission
───────────────────────────────────────────────────────────────────────── */
const VISION_MISSION_DATA = {
  sectionNumber: '05',
  sectionLabel: 'OUR DIRECTION',
  headline: 'WHAT DRIVES\nUS',
  intro:
    'Bridging foundational academic excellence with student-led discovery, the division unites rigorous technology education with purposeful innovation and societal impact.',
  vision: {
    number: '01',
    label: 'VISION',
    statement:
      'To become a world leader in higher education and research in the field of Information Technology.',
    tagline: 'Primary Direction',
  },
  mission: {
    number: '02',
    label: 'MISSION',
    lead: 'Translating institutional aspiration into real-world capability and student leadership.',
    pillars: [
      {
        title: 'Knowledge & Excellence',
        description:
          'To impart state-of-the-art knowledge in the field of Information Technology with a focus on developing required competencies and virtues to meet the requirements of the society and to become a centre of excellence in this field.',
      },
      {
        title: 'Innovation & Entrepreneurship',
        description:
          'To attract graduate, post-graduate, and research students and train them in innovative areas so that they can impress various recruiters from industry and academia and also become entrepreneurs in Information Technology.',
      },
    ],
  },
};

export default function VisionMission() {
  const sectionRef   = useRef(null);
  const headerRef    = useRef(null);
  const visionRef    = useRef(null);
  const connectorRef = useRef(null);
  const missionRef   = useRef(null);

  useEffect(() => {
    const ease = 'power3.out';

    const ctx = gsap.context(() => {
      // 1 — Section intro: label, heading lines, and introductory description
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

      // 2 — Primary Vision block entrance
      gsap.from(visionRef.current, {
        scrollTrigger: {
          trigger: visionRef.current,
          start: 'top 82%',
          once: true,
        },
        y: 45,
        opacity: 0,
        duration: 1.1,
        ease,
      });

      // 3 — Subtle connector animation
      if (connectorRef.current) {
        gsap.from(connectorRef.current, {
          scrollTrigger: {
            trigger: connectorRef.current,
            start: 'top 85%',
            once: true,
          },
          scaleY: 0,
          opacity: 0,
          duration: 0.8,
          ease: 'power2.out',
        });
      }

      // 4 — Supporting Mission block entrance (subtly staggered)
      gsap.from(missionRef.current, {
        scrollTrigger: {
          trigger: missionRef.current,
          start: 'top 82%',
          once: true,
        },
        y: 40,
        opacity: 0,
        duration: 1.1,
        delay: 0.15,
        ease,
      });

      // 5 — Mission pillars stagger
      gsap.from(missionRef.current.querySelectorAll('.vm-pillar-item'), {
        scrollTrigger: {
          trigger: missionRef.current,
          start: 'top 78%',
          once: true,
        },
        y: 25,
        opacity: 0,
        duration: 0.85,
        stagger: 0.16,
        delay: 0.3,
        ease,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="vm-section" ref={sectionRef} id="vision-mission">
      <div className="vm-container">

        {/* ── Section Header ───────────────────────────────── */}
        <div className="vm-header" ref={headerRef}>
          <div className="vm-header-meta gsap-reveal-header">
            <span className="vm-label-num">{VISION_MISSION_DATA.sectionNumber}</span>
            <span className="vm-label-divider">—</span>
            <span className="vm-label-text">{VISION_MISSION_DATA.sectionLabel}</span>
          </div>

          <div className="vm-header-main">
            <h2 className="vm-heading gsap-reveal-header">
              {VISION_MISSION_DATA.headline.split('\n').map((line, i) => (
                <span key={i} className="vm-heading-line">{line}</span>
              ))}
            </h2>
            <p className="vm-intro-body gsap-reveal-header">
              {VISION_MISSION_DATA.intro}
            </p>
          </div>
        </div>

        {/* ── Editorial Composition ────────────────────────── */}
        <div className="vm-composition">

          {/* 01 / VISION — Large Primary Statement */}
          <div className="vm-vision-card" ref={visionRef}>
            <div className="vm-card-topbar">
              <div className="vm-badge">
                <span className="vm-badge-dot" />
                <span className="vm-badge-label">
                  {VISION_MISSION_DATA.vision.number} / {VISION_MISSION_DATA.vision.label}
                </span>
              </div>
              <span className="vm-tagline">{VISION_MISSION_DATA.vision.tagline}</span>
            </div>

            <div className="vm-vision-body">
              <span className="vm-oversized-num" aria-hidden="true">
                {VISION_MISSION_DATA.vision.number}
              </span>
              <blockquote className="vm-vision-quote">
                "{VISION_MISSION_DATA.vision.statement}"
              </blockquote>
            </div>

            <div className="vm-vision-footer">
              <span className="vm-source-label">
                Division of Information Technology · School of Engineering, CUSAT
              </span>
            </div>
          </div>

          {/* Editorial Connector Graphic */}
          <div className="vm-connector" ref={connectorRef} aria-hidden="true">
            <span className="vm-connector-line" />
            <span className="vm-connector-mark">+</span>
            <span className="vm-connector-line" />
          </div>

          {/* 02 / MISSION — Supporting Action-Oriented Statement */}
          <div className="vm-mission-card" ref={missionRef}>
            <div className="vm-card-topbar">
              <div className="vm-badge vm-badge-mission">
                <span className="vm-badge-dot vm-dot-burgundy" />
                <span className="vm-badge-label">
                  {VISION_MISSION_DATA.mission.number} / {VISION_MISSION_DATA.mission.label}
                </span>
              </div>
              <span className="vm-tagline">Strategic Execution</span>
            </div>

            <div className="vm-mission-lead-wrapper">
              <span className="vm-oversized-num vm-mission-num" aria-hidden="true">
                {VISION_MISSION_DATA.mission.number}
              </span>
              <p className="vm-mission-lead">
                {VISION_MISSION_DATA.mission.lead}
              </p>
            </div>

            <div className="vm-pillars-grid">
              {VISION_MISSION_DATA.mission.pillars.map((pillar, index) => (
                <div key={index} className="vm-pillar-item">
                  <div className="vm-pillar-header">
                    <span className="vm-pillar-index">0{index + 1}</span>
                    <h3 className="vm-pillar-title">{pillar.title}</h3>
                  </div>
                  <p className="vm-pillar-desc">{pillar.description}</p>
                </div>
              ))}
            </div>
          </div>

        </div>{/* /vm-composition */}

      </div>{/* /vm-container */}
    </section>
  );
}
