import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Quote, GraduationCap } from 'lucide-react';
import {
  alumniSpotlight,
  alumniProfiles,
  alumniDisclaimer,
} from '../data/alumniData';
import { animateReveal } from '../utils/animations';
import './Alumni.css';

export default function Alumni() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const spotlightRef = useRef(null);
  const profilesRef = useRef(null);

  useEffect(() => {
    const ease = 'power3.out';

    const ctx = gsap.context(() => {
      // 1 — Section header reveal
      animateReveal(headerRef.current.querySelectorAll('.gsap-reveal-header'), {
        trigger: headerRef.current,
        start: 'top 85%',
        y: 40,
        duration: 1.0,
        stagger: 0.14,
        ease,
      });

      // 2 — Spotlight image reveal
      const spotImgWrap = spotlightRef.current.querySelector('.alumni-spotlight-image-wrap');
      const spotContent = spotlightRef.current.querySelector('.alumni-spotlight-content');

      animateReveal(spotImgWrap, {
        trigger: spotlightRef.current,
        start: 'top 80%',
        clipPath: { from: 'inset(0% 0% 100% 0%)', to: 'inset(0% 0% 0% 0%)' },
        duration: 1.25,
        ease,
      });

      animateReveal(spotContent.children, {
        trigger: spotlightRef.current,
        start: 'top 80%',
        y: 30,
        duration: 0.9,
        stagger: 0.1,
        delay: 0.15,
        ease,
      });

      // 3 — Compact profiles reveal (Graduate Trajectories)
      animateReveal(profilesRef.current.querySelectorAll('.alumni-profile-card'), {
        trigger: profilesRef.current,
        start: 'top 85%',
        y: 25,
        duration: 0.8,
        stagger: 0.1,
        ease,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="alumni-section" ref={sectionRef} id="alumni">
      <div className="alumni-container">

        {/* ── 1. Section Header ────────────────────────────── */}
        <header className="alumni-header" ref={headerRef}>
          <div className="alumni-header-meta gsap-reveal-header">
            <span className="alumni-label-num">11</span>
            <span className="alumni-label-divider">—</span>
            <span className="alumni-label-text">ALUMNI</span>
            <span className="alumni-badge-prototype">Sample Profiles</span>
          </div>

          <div className="alumni-header-main">
            <h2 className="alumni-heading gsap-reveal-header">
              Where SAIT takes you.
            </h2>
            <p className="alumni-intro-body gsap-reveal-header">
              Stories and journeys of students who carried their experiences beyond the department.
            </p>
          </div>
        </header>

        {/* ── 2. Featured Alumni Spotlight ─────────────────── */}
        <div className="alumni-spotlight-wrapper" ref={spotlightRef}>
          <div className="alumni-spotlight-card">
            
            {/* Left: Professional Portrait with Inset Border */}
            <div className="alumni-spotlight-visual-col">
              <div className="alumni-spotlight-image-wrap">
                <img
                  src={alumniSpotlight.image}
                  alt={`${alumniSpotlight.name} — Sample Alumni Portrait`}
                  className="alumni-spotlight-image"
                  loading="lazy"
                />
                <span className="alumni-image-border" aria-hidden="true" />
                <div className="alumni-year-badge">
                  <GraduationCap size={14} className="alumni-grad-icon" aria-hidden="true" />
                  <span>{alumniSpotlight.graduationYear}</span>
                </div>
              </div>
            </div>

            {/* Right: Editorial Narrative & Career Story */}
            <div className="alumni-spotlight-content">
              <div className="alumni-spotlight-meta-top">
                <span className="alumni-spotlight-tag">ALUMNI SPOTLIGHT</span>
                <span className="alumni-spotlight-bullet" aria-hidden="true">•</span>
                <span className="alumni-spotlight-subtag">Prototype Profile</span>
              </div>

              <h3 className="alumni-spotlight-name">{alumniSpotlight.name}</h3>
              
              <div className="alumni-spotlight-role-row">
                <span className="alumni-spotlight-role">{alumniSpotlight.role}</span>
                <span className="alumni-spotlight-org">at {alumniSpotlight.organization}</span>
              </div>

              <p className="alumni-spotlight-story">
                {alumniSpotlight.story}
              </p>

              {/* Quote Block */}
              <div className="alumni-spotlight-quote">
                <Quote size={18} className="alumni-quote-icon" aria-hidden="true" />
                <p className="alumni-quote-text">
                  “{alumniSpotlight.quote}”
                </p>
              </div>

              {/* Competency Badges */}
              <div className="alumni-skills-row">
                {alumniSpotlight.skills.map((skill, i) => (
                  <span key={i} className="alumni-skill-pill">{skill}</span>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* ── 3. Compact Alumni Profiles ───────────────────── */}
        <div className="alumni-profiles-wrapper" ref={profilesRef}>
          <div className="alumni-profiles-header">
            <div className="alumni-profiles-title-wrap">
              <span className="alumni-profiles-num">02</span>
              <h3 className="alumni-profiles-heading">Graduate Trajectories</h3>
            </div>
            <p className="alumni-profiles-subtext">
              Selected sample snapshots showcasing diverse paths across systems, engineering management, and intelligence platforms.
            </p>
          </div>

          <div className="alumni-profiles-grid">
            {alumniProfiles.map((alum) => (
              <article key={alum.id} className="alumni-profile-card">
                <div className="alumni-card-top">
                  <div className="alumni-card-avatar-wrap">
                    <img
                      src={alum.image}
                      alt={`${alum.name} portrait`}
                      className="alumni-card-avatar"
                      loading="lazy"
                    />
                  </div>

                  <div className="alumni-card-identity">
                    <h4 className="alumni-card-name">{alum.name}</h4>
                    <span className="alumni-card-year">{alum.graduationYear}</span>
                  </div>
                </div>

                <div className="alumni-card-role-wrap">
                  <span className="alumni-card-role">{alum.currentRole}</span>
                  <span className="alumni-card-org">at {alum.organization}</span>
                </div>

                <div className="alumni-card-focus-tag">
                  <span>{alum.focus}</span>
                </div>

                <p className="alumni-card-achievement">
                  {alum.achievement}
                </p>
              </article>
            ))}
          </div>

          <div className="alumni-footnote">
            <span className="alumni-footnote-dot" aria-hidden="true" />
            <span>{alumniDisclaimer}</span>
          </div>
        </div>

      </div>{/* /alumni-container */}
    </section>
  );
}
