import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { images } from '../data/images';
import './Department.css';

gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────────────────────────────────────────────────────────
   Static content — update copy here; keep presentation in JSX/CSS
───────────────────────────────────────────────────────────────────────── */
const DEPT_CONTENT = {
  sectionNumber: '04',
  sectionLabel: 'The Department',
  superLabel: 'School of Engineering · Information Technology',
  foundingYear: '1995',
  headline: 'The\nDepartment',
  body: [
    'The Division of Information Technology at the School of Engineering, CUSAT, has been at the forefront of technology education since its establishment in 1995. The division offers programmes that blend foundational computer science with the demands of a rapidly evolving technology landscape.',
    'Rooted in rigorous academic practice and a culture of inquiry, the department prepares students to think critically, build meaningfully, and contribute to the broader technology community — locally and globally.',
  ],
  accentStatement: 'Where\nTechnology\nMeets\nPurpose.',
  imageAlt: 'University technology environment — placeholder for CUSAT/IT Division photography',
};

/* ─────────────────────────────────────────────────────────────────────────
   Component
───────────────────────────────────────────────────────────────────────── */
export default function Department() {
  const sectionRef    = useRef(null);
  const labelRef      = useRef(null);
  const yearRef       = useRef(null);
  const headingRef    = useRef(null);
  const imageWrapRef  = useRef(null);
  const accentRef     = useRef(null);
  const bodyRef       = useRef(null);

  useEffect(() => {
    const ease = 'power3.out';

    const ctx = gsap.context(() => {

      /* 1 — Super-label slides in */
      gsap.from(labelRef.current, {
        scrollTrigger: { trigger: labelRef.current, start: 'top 88%', once: true },
        opacity: 0,
        x: -20,
        duration: 0.85,
        ease,
      });

      /* 2 — Year counter-style fade + scale from large */
      gsap.from(yearRef.current, {
        scrollTrigger: { trigger: yearRef.current, start: 'top 85%', once: true },
        opacity: 0,
        scale: 1.08,
        duration: 1.1,
        ease,
      });

      /* 3 — Heading lines wipe up (per-line stagger) */
      gsap.from(headingRef.current.querySelectorAll('.dept-heading-line'), {
        scrollTrigger: { trigger: headingRef.current, start: 'top 82%', once: true },
        y: 70,
        opacity: 0,
        duration: 1.1,
        stagger: 0.16,
        ease,
      });

      /* 4 — Image reveals with clip-path wipe from left */
      gsap.fromTo(
        imageWrapRef.current,
        { clipPath: 'inset(0% 100% 0% 0%)' },
        {
          scrollTrigger: { trigger: imageWrapRef.current, start: 'top 80%', once: true },
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 1.35,
          ease,
        }
      );

      /* 5 — Burgundy accent block rises after image */
      gsap.from(accentRef.current, {
        scrollTrigger: { trigger: accentRef.current, start: 'top 84%', once: true },
        y: 30,
        opacity: 0,
        duration: 1.0,
        delay: 0.25,
        ease,
      });

      /* 6 — Body copy fades up */
      gsap.from(bodyRef.current, {
        scrollTrigger: { trigger: bodyRef.current, start: 'top 86%', once: true },
        y: 22,
        opacity: 0,
        duration: 0.95,
        ease,
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="dept-section" ref={sectionRef} id="department">

      {/* ── Top bar: super-label + founding year ──────────── */}
      <div className="dept-top-bar">
        <span className="dept-super-label" ref={labelRef}>
          {DEPT_CONTENT.superLabel}
        </span>
        {/* Large year — pure editorial typographic detail */}
        <span className="dept-year" ref={yearRef} aria-hidden="true">
          {DEPT_CONTENT.foundingYear}
        </span>
      </div>

      {/* ── Section number + heading ───────────────────────── */}
      <div className="dept-heading-block">
        <span className="dept-section-num">{DEPT_CONTENT.sectionNumber}</span>
        <h2 className="dept-heading" ref={headingRef}>
          {DEPT_CONTENT.headline.split('\n').map((line, i) => (
            <span key={i} className="dept-heading-line">{line}</span>
          ))}
        </h2>
      </div>

      {/* ── Main composition ───────────────────────────────── */}
      <div className="dept-composition">

        {/* Large photograph — spans full width, slightly offset */}
        <div className="dept-image-wrap" ref={imageWrapRef}>
          <img
            src={images.department}
            alt={DEPT_CONTENT.imageAlt}
            className="dept-image"
            loading="lazy"
          />
          {/* Thin inset border — editorial detail */}
          <span className="dept-image-border" aria-hidden="true" />
        </div>

        {/* Burgundy accent block — sits below/beside image */}
        <div className="dept-accent-block" ref={accentRef}>
          {DEPT_CONTENT.accentStatement.split('\n').map((line, i) => (
            <span key={i} className="dept-accent-line">{line}</span>
          ))}
        </div>

      </div>{/* /dept-composition */}

      {/* ── Body copy row ─────────────────────────────────── */}
      <div className="dept-body-row" ref={bodyRef}>
        {/* Left: thin vertical rule + established note */}
        <div className="dept-body-aside">
          <span className="dept-aside-rule" aria-hidden="true" />
          <p className="dept-aside-note">
            Est.&thinsp;{DEPT_CONTENT.foundingYear}<br />
            CUSAT
          </p>
        </div>

        {/* Right: description paragraphs */}
        <div className="dept-body-text">
          {DEPT_CONTENT.body.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </div>

    </section>
  );
}
