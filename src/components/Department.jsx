import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { animateReveal } from '../utils/animations';
import { departmentContent } from '../data/departmentData';
import { images } from '../data/images';
import './Department.css';

gsap.registerPlugin(ScrollTrigger);

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
      animateReveal(labelRef.current, {
        trigger: labelRef.current,
        start: 'top 88%',
        x: -20,
        y: 0,
        duration: 0.85,
        ease,
      });

      /* 2 — Year counter-style fade + scale from large */
      animateReveal(yearRef.current, {
        trigger: yearRef.current,
        start: 'top 85%',
        scale: 1.08,
        y: 0,
        duration: 1.1,
        ease,
      });

      /* 3 — Heading lines wipe up (per-line stagger) */
      animateReveal(headingRef.current.querySelectorAll('.dept-heading-line'), {
        trigger: headingRef.current,
        start: 'top 82%',
        y: 70,
        duration: 1.1,
        stagger: 0.16,
        ease,
      });

      /* 4 — Image reveals with clip-path wipe from left */
      animateReveal(imageWrapRef.current, {
        trigger: imageWrapRef.current,
        start: 'top 80%',
        clipPath: { from: 'inset(0% 100% 0% 0%)', to: 'inset(0% 0% 0% 0%)' },
        duration: 1.35,
        ease,
      });

      /* 5 — Burgundy accent block rises after image */
      animateReveal(accentRef.current, {
        trigger: accentRef.current,
        start: 'top 84%',
        y: 30,
        duration: 1.0,
        delay: 0.25,
        ease,
      });

      /* 6 — Body copy fades up */
      animateReveal(bodyRef.current, {
        trigger: bodyRef.current,
        start: 'top 86%',
        y: 22,
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
          {departmentContent.superLabel}
        </span>
        {/* Large year — pure editorial typographic detail */}
        <span className="dept-year" ref={yearRef} aria-hidden="true">
          {departmentContent.foundingYear}
        </span>
      </div>

      {/* ── Section number + heading ───────────────────────── */}
      <div className="dept-heading-block">
        <span className="dept-section-num">{departmentContent.sectionNumber}</span>
        <h2 className="dept-heading" ref={headingRef}>
          {departmentContent.headline.split('\n').map((line, i) => (
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
            alt={departmentContent.imageAlt}
            className="dept-image"
            loading="lazy"
          />
          {/* Thin inset border — editorial detail */}
          <span className="dept-image-border" aria-hidden="true" />
        </div>

        {/* Burgundy accent block — sits below/beside image */}
        <div className="dept-accent-block" ref={accentRef}>
          {departmentContent.accentStatement.split('\n').map((line, i) => (
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
            Est.&thinsp;{departmentContent.foundingYear}<br />
            CUSAT
          </p>
        </div>

        {/* Right: description paragraphs */}
        <div className="dept-body-text">
          {departmentContent.body.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </div>

    </section>
  );
}
