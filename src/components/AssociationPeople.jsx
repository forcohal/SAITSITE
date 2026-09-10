import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Users } from 'lucide-react';
import {
  chairpersonProfile,
  executiveMembers,
  teamsData,
} from '../data/associationData';
import './AssociationPeople.css';

gsap.registerPlugin(ScrollTrigger);

const teamKeys = ['tech', 'media', 'events', 'pr', 'content'];

export default function AssociationPeople() {
  const [activeTeamKey, setActiveTeamKey] = useState('tech');
  const sectionRef      = useRef(null);
  const headerRef       = useRef(null);
  const execFeatureRef  = useRef(null);
  const execGridRef     = useRef(null);
  const teamsNavRef     = useRef(null);
  const teamContentRef  = useRef(null);

  const activeTeam = teamsData[activeTeamKey];

  useEffect(() => {
    const ease = 'power3.out';

    const ctx = gsap.context(() => {
      // 1 — Section heading reveals
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

      // 2 — Executive feature reveals (Chairperson)
      const chairImage = execFeatureRef.current.querySelector('.assoc-chair-image-wrap');
      const chairInfo = execFeatureRef.current.querySelector('.assoc-chair-info');

      gsap.fromTo(
        chairImage,
        { clipPath: 'inset(100% 0% 0% 0%)' },
        {
          scrollTrigger: {
            trigger: execFeatureRef.current,
            start: 'top 80%',
            once: true,
          },
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 1.2,
          ease,
        }
      );

      gsap.from(chairInfo.children, {
        scrollTrigger: {
          trigger: execFeatureRef.current,
          start: 'top 80%',
          once: true,
        },
        y: 30,
        opacity: 0,
        duration: 0.95,
        stagger: 0.12,
        delay: 0.15,
        ease,
      });

      // 3 — Other executive members reveal
      gsap.from(execGridRef.current.querySelectorAll('.assoc-exec-card'), {
        scrollTrigger: {
          trigger: execGridRef.current,
          start: 'top 82%',
          once: true,
        },
        y: 30,
        opacity: 0,
        duration: 0.85,
        stagger: 0.08,
        ease,
      });

      // 4 — Team navigation appears
      gsap.from(teamsNavRef.current, {
        scrollTrigger: {
          trigger: teamsNavRef.current,
          start: 'top 85%',
          once: true,
        },
        y: 25,
        opacity: 0,
        duration: 0.8,
        ease,
      });

      // 5 — Initial team members reveal
      gsap.from(teamContentRef.current.querySelectorAll('.assoc-member-card'), {
        scrollTrigger: {
          trigger: teamContentRef.current,
          start: 'top 82%',
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

  // Smooth transition when switching teams
  useEffect(() => {
    if (!teamContentRef.current) return;
    const cards = teamContentRef.current.querySelectorAll('.assoc-member-card');
    const headerInfo = teamContentRef.current.querySelector('.assoc-team-overview');

    gsap.fromTo(
      [headerInfo, ...cards],
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.45, stagger: 0.04, ease: 'power2.out' }
    );
  }, [activeTeamKey]);

  return (
    <section className="assoc-section" ref={sectionRef} id="people">
      <span id="association" className="assoc-anchor" aria-hidden="true" />
      <div className="assoc-container">

        {/* ── 1. Section Header ────────────────────────────── */}
        <header className="assoc-header" ref={headerRef}>
          <div className="assoc-header-meta gsap-reveal-header">
            <span className="assoc-label-num">08</span>
            <span className="assoc-label-divider">—</span>
            <span className="assoc-label-text">THE PEOPLE OF SAIT</span>
          </div>

          <div className="assoc-header-main">
            <h2 className="assoc-heading gsap-reveal-header">
              Built by students.<br />Driven by ideas.
            </h2>
            <p className="assoc-intro-body gsap-reveal-header">
              Meet the students who bring SAIT's events, technology, media and community initiatives to life across the Division of Information Technology.
            </p>
          </div>
        </header>

        {/* ── 2. Executive Committee ────────────────────────── */}
        <div className="assoc-subsection">
          <div className="assoc-sub-header">
            <div className="assoc-sub-badge">
              <span className="assoc-sub-num">01</span>
              <span className="assoc-sub-title">Executive Committee</span>
            </div>
            <p className="assoc-sub-tagline">
              Student leadership driving departmental innovation, academic forums, and community initiatives.
            </p>
          </div>

          {/* Featured Chairperson Profile */}
          <div className="assoc-chair-wrapper" ref={execFeatureRef}>
            <div className="assoc-chair-grid">
              
              {/* Left: Prominent Portrait */}
              <div className="assoc-chair-image-col">
                <div className="assoc-chair-image-wrap">
                  <img
                    src={chairpersonProfile.image}
                    alt={`Portrait of ${chairpersonProfile.name}, ${chairpersonProfile.role}`}
                    className="assoc-chair-image"
                    loading="lazy"
                  />
                  <span className="assoc-image-border" aria-hidden="true" />
                </div>
              </div>

              {/* Right: Detailed Leadership Profile */}
              <div className="assoc-chair-info">
                <div className="assoc-badge">
                  <span className="assoc-badge-dot" />
                  <span className="assoc-badge-label">{chairpersonProfile.role}</span>
                </div>

                <h3 className="assoc-chair-name">{chairpersonProfile.name}</h3>
                <p className="assoc-chair-year">{chairpersonProfile.year}</p>

                <p className="assoc-chair-bio">{chairpersonProfile.bio}</p>

                <blockquote className="assoc-chair-quote">
                  "{chairpersonProfile.quote}"
                </blockquote>
              </div>

            </div>
          </div>

          {/* Supporting Executive Officers Grid */}
          <div className="assoc-exec-grid" ref={execGridRef}>
            {executiveMembers.map((exec) => (
              <div key={exec.id} className="assoc-exec-card">
                <div className="assoc-exec-image-wrap">
                  <img
                    src={exec.image}
                    alt={`Portrait of ${exec.name}, ${exec.role}`}
                    className="assoc-exec-image"
                    loading="lazy"
                  />
                  <span className="assoc-image-border" aria-hidden="true" />
                </div>

                <div className="assoc-exec-content">
                  <span className="assoc-exec-role">{exec.role}</span>
                  <h4 className="assoc-exec-name">{exec.name}</h4>
                  <div className="assoc-exec-footer">
                    <span className="assoc-exec-year">{exec.year}</span>
                    <span className="assoc-exec-focus">{exec.focus}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── 3. SAIT Teams & Interactive Directory ─────────── */}
        <div className="assoc-subsection assoc-teams-wrapper">
          <div className="assoc-sub-header">
            <div className="assoc-sub-badge">
              <span className="assoc-sub-num">02</span>
              <span className="assoc-sub-title">SAIT Teams</span>
            </div>
            <p className="assoc-sub-tagline">
              Five dedicated divisions powering technology, visual design, events, relations, and publications.
            </p>
          </div>

          {/* Interactive Team Switcher Bar */}
          <div className="assoc-team-nav-container" ref={teamsNavRef}>
            <div className="assoc-team-nav" role="tablist" aria-label="SAIT Teams Switcher">
              {teamKeys.map((key) => {
                const team = teamsData[key];
                const isActive = activeTeamKey === key;
                return (
                  <button
                    key={key}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    className={`assoc-team-tab-btn ${isActive ? 'active' : ''}`}
                    onClick={() => setActiveTeamKey(key)}
                  >
                    <span className="assoc-tab-tag">{team.tag}</span>
                    <span className="assoc-tab-name">{team.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Team Container */}
          <div className="assoc-team-content-area" ref={teamContentRef}>
            
            {/* Team Overview Card */}
            <div className="assoc-team-overview">
              <div className="assoc-team-overview-main">
                <div className="assoc-team-tagline-wrap">
                  <span className="assoc-team-num-badge">{activeTeam.tag}</span>
                  <h3 className="assoc-team-full-title">{activeTeam.title}</h3>
                </div>
                <p className="assoc-team-desc">{activeTeam.description}</p>
              </div>

              <div className="assoc-team-overview-meta">
                <div className="assoc-team-lead-box">
                  <span className="assoc-meta-label">{activeTeam.leadRole}</span>
                  <span className="assoc-meta-value">{activeTeam.lead}</span>
                </div>
                <div className="assoc-team-count-box">
                  <Users size={16} className="assoc-meta-icon" aria-hidden="true" />
                  <span className="assoc-meta-count">{activeTeam.memberCount}</span>
                </div>
              </div>
            </div>

            {/* Team Members Grid */}
            <div className="assoc-members-grid">
              {activeTeam.members.map((member) => (
                <article key={member.id} className="assoc-member-card">
                  <div className="assoc-member-image-wrap">
                    <img
                      src={member.image}
                      alt={`Portrait of ${member.name}, ${member.role}`}
                      className="assoc-member-image"
                      loading="lazy"
                    />
                    <span className="assoc-image-border" aria-hidden="true" />
                  </div>

                  <div className="assoc-member-content">
                    <div className="assoc-member-top">
                      <span className="assoc-member-role">{member.role}</span>
                      <span className="assoc-member-year">{member.year}</span>
                    </div>

                    <h4 className="assoc-member-name">{member.name}</h4>

                    {member.specialization && (
                      <p className="assoc-member-spec">{member.specialization}</p>
                    )}
                  </div>
                </article>
              ))}
            </div>

          </div>{/* /assoc-team-content-area */}

        </div>{/* /assoc-teams-wrapper */}

      </div>{/* /assoc-container */}
    </section>
  );
}
