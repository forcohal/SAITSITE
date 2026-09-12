import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { animateReveal } from '../utils/animations';
import { visionMissionData } from '../data/visionMissionData';
import './VisionMission.css';

gsap.registerPlugin(ScrollTrigger);

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
      animateReveal(headerRef.current.querySelectorAll('.gsap-reveal-header'), {
        trigger: headerRef.current,
        start: 'top 85%',
        y: 40,
        duration: 1.0,
        stagger: 0.14,
        ease,
      });

      // 2 — Primary Vision block entrance
      animateReveal(visionRef.current, {
        trigger: visionRef.current,
        start: 'top 82%',
        y: 45,
        duration: 1.1,
        ease,
      });

      // 3 — Subtle connector animation
      if (connectorRef.current) {
        animateReveal(connectorRef.current, {
          trigger: connectorRef.current,
          start: 'top 85%',
          scaleY: 0,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
        });
      }

      // 4 — Supporting Mission block entrance (subtly staggered)
      animateReveal(missionRef.current, {
        trigger: missionRef.current,
        start: 'top 82%',
        y: 40,
        duration: 1.1,
        delay: 0.15,
        ease,
      });

      // 5 — Mission pillars stagger
      animateReveal(missionRef.current.querySelectorAll('.vm-pillar-item'), {
        trigger: missionRef.current,
        start: 'top 78%',
        y: 25,
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
            <span className="vm-label-num">{visionMissionData.sectionNumber}</span>
            <span className="vm-label-divider">—</span>
            <span className="vm-label-text">{visionMissionData.sectionLabel}</span>
          </div>

          <div className="vm-header-main">
            <h2 className="vm-heading gsap-reveal-header">
              {visionMissionData.headline.split('\n').map((line, i) => (
                <span key={i} className="vm-heading-line">{line}</span>
              ))}
            </h2>
            <p className="vm-intro-body gsap-reveal-header">
              {visionMissionData.intro}
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
                  {visionMissionData.vision.number} / {visionMissionData.vision.label}
                </span>
              </div>
              <span className="vm-tagline">{visionMissionData.vision.tagline}</span>
            </div>

            <div className="vm-vision-body">
              <span className="vm-oversized-num" aria-hidden="true">
                {visionMissionData.vision.number}
              </span>
              <blockquote className="vm-vision-quote">
                "{visionMissionData.vision.statement}"
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
                  {visionMissionData.mission.number} / {visionMissionData.mission.label}
                </span>
              </div>
              <span className="vm-tagline">Strategic Execution</span>
            </div>

            <div className="vm-mission-lead-wrapper">
              <span className="vm-oversized-num vm-mission-num" aria-hidden="true">
                {visionMissionData.mission.number}
              </span>
              <p className="vm-mission-lead">
                {visionMissionData.mission.lead}
              </p>
            </div>

            <div className="vm-pillars-grid">
              {visionMissionData.mission.pillars.map((pillar, index) => (
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
