import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import { hodData, coordinatorsData, facultyMembers } from '../data/facultyData';
import './FacultyAdministration.css';

gsap.registerPlugin(ScrollTrigger);

export default function FacultyAdministration() {
  const sectionRef       = useRef(null);
  const headerRef        = useRef(null);
  const hodRef           = useRef(null);
  const coordinatorsRef  = useRef(null);
  const facultyRef       = useRef(null);

  useEffect(() => {
    const ease = 'power3.out';

    const ctx = gsap.context(() => {
      // 1 — Main section header reveal
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

      // 2 — Head of Department section entrance
      const hodImage = hodRef.current.querySelector('.faculty-hod-image-wrap');
      const hodInfo = hodRef.current.querySelector('.faculty-hod-info');

      gsap.fromTo(
        hodImage,
        { clipPath: 'inset(100% 0% 0% 0%)' },
        {
          scrollTrigger: {
            trigger: hodRef.current,
            start: 'top 80%',
            once: true,
          },
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 1.25,
          ease,
        }
      );

      gsap.from(hodInfo.children, {
        scrollTrigger: {
          trigger: hodRef.current,
          start: 'top 80%',
          once: true,
        },
        y: 30,
        opacity: 0,
        duration: 1.0,
        stagger: 0.12,
        delay: 0.15,
        ease,
      });

      // 3 — Coordinators cards reveal sequentially
      gsap.from(coordinatorsRef.current.querySelectorAll('.faculty-coord-card'), {
        scrollTrigger: {
          trigger: coordinatorsRef.current,
          start: 'top 82%',
          once: true,
        },
        y: 35,
        opacity: 0,
        duration: 0.9,
        stagger: 0.14,
        ease,
      });

      // 4 — Faculty directory cards reveal with stagger
      gsap.from(facultyRef.current.querySelectorAll('.faculty-card'), {
        scrollTrigger: {
          trigger: facultyRef.current,
          start: 'top 80%',
          once: true,
        },
        y: 30,
        opacity: 0,
        duration: 0.85,
        stagger: 0.08,
        ease,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="faculty-section" ref={sectionRef} id="faculty">

      <div className="faculty-container">

        {/* ── 1. Section Header ────────────────────────────── */}
        <header className="faculty-header" ref={headerRef}>
          <div className="faculty-header-meta gsap-reveal-header">
            <span className="faculty-label-num">06</span>
            <span className="faculty-label-divider">—</span>
            <span className="faculty-label-text">PEOPLE BEHIND THE DEPARTMENT</span>
          </div>

          <div className="faculty-header-main">
            <h2 className="faculty-heading gsap-reveal-header">
              Faculty &amp;<br />Administration
            </h2>
            <p className="faculty-intro-body gsap-reveal-header">
              Meet the faculty members, coordinators, and academic leaders who support the Department of Information Technology and empower the student community.
            </p>
          </div>
        </header>

        {/* ── 2. Head of Department ────────────────────────── */}
        <div className="faculty-subsection faculty-hod-wrapper" ref={hodRef}>
          <div className="faculty-hod-grid">

            {/* Left: Large Editorial Portrait */}
            <div className="faculty-hod-image-col">
              <div className="faculty-hod-image-wrap">
                <img
                  src={hodData.image}
                  alt={`Portrait of ${hodData.name}, ${hodData.designation}`}
                  className="faculty-hod-image"
                  loading="lazy"
                />
                <span className="faculty-image-border" aria-hidden="true" />
              </div>
            </div>

            {/* Right: Detailed Metadata & Biography */}
            <div className="faculty-hod-info">
              <div className="faculty-badge">
                <span className="faculty-badge-dot" />
                <span className="faculty-badge-label">{hodData.label}</span>
              </div>

              <h3 className="faculty-hod-name">{hodData.name}</h3>
              <p className="faculty-hod-designation">{hodData.designation}</p>

              <div className="faculty-hod-bio">
                <p>{hodData.bio}</p>
              </div>

              <dl className="faculty-hod-meta">
                {hodData.meta.map((item, index) => (
                  <div key={index} className="faculty-hod-meta-item">
                    <dt>{item.label}</dt>
                    <dd>{item.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

          </div>
        </div>

        {/* ── 3. Staff & Coordinators ──────────────────────── */}
        <div className="faculty-subsection" ref={coordinatorsRef}>
          <div className="faculty-subsection-header">
            <div className="faculty-sub-badge">
              <span className="faculty-sub-num">02</span>
              <span className="faculty-sub-title">Staff &amp; Coordinators</span>
            </div>
            <p className="faculty-sub-tagline">
              Guiding operations, academic frameworks, and student association programs.
            </p>
          </div>

          <div className="faculty-coordinators-grid">
            {coordinatorsData.map((person) => (
              <div key={person.id} className="faculty-coord-card">
                <div className="faculty-coord-image-wrap">
                  <img
                    src={person.image}
                    alt={`Portrait of ${person.name}, ${person.role}`}
                    className="faculty-coord-image"
                    loading="lazy"
                  />
                  <span className="faculty-image-border" aria-hidden="true" />
                </div>

                <div className="faculty-coord-content">
                  <div className="faculty-coord-top">
                    <span className="faculty-coord-role">{person.role}</span>
                    <ArrowUpRight className="faculty-coord-icon" size={16} aria-hidden="true" />
                  </div>
                  <h4 className="faculty-coord-name">{person.name}</h4>
                  <p className="faculty-coord-desc">{person.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── 4. Faculty Directory ─────────────────────────── */}
        <div className="faculty-subsection" ref={facultyRef}>
          <div className="faculty-subsection-header">
            <div className="faculty-sub-badge">
              <span className="faculty-sub-num">03</span>
              <span className="faculty-sub-title">Faculty Directory</span>
            </div>
            <p className="faculty-sub-tagline">
              Scholars and educators dedicated to academic distinction and computing innovation.
            </p>
          </div>

          <div className="faculty-directory-grid">
            {facultyMembers.map((member) => (
              <article key={member.id} className="faculty-card">
                <div className="faculty-card-image-wrap">
                  <img
                    src={member.image}
                    alt={`Portrait of ${member.name}, ${member.designation}`}
                    className="faculty-card-image"
                    loading="lazy"
                  />
                  <span className="faculty-image-border" aria-hidden="true" />
                </div>

                <div className="faculty-card-content">
                  <h4 className="faculty-card-name">{member.name}</h4>
                  <p className="faculty-card-designation">{member.designation}</p>
                  <p className="faculty-card-specialization">{member.specialization}</p>
                </div>
              </article>
            ))}
          </div>
        </div>

      </div>{/* /faculty-container */}
    </section>
  );
}
