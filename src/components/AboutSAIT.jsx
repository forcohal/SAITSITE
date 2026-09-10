import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { images } from '../data/images';
import './AboutSAIT.css';

gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────────────────────────────────────────────────────────
   Static content — update copy here; keep layout in JSX
───────────────────────────────────────────────────────────────────────── */
const ABOUT_CONTENT = {
  sectionNumber: '03',
  sectionLabel: 'About',
  headline: ['About', 'SAIT'],
  featureStatement: ['Students', 'Building', 'Together.'],
  body: [
    'SAIT — the Students Association of Information Technology — is the official student community of the Division of Information Technology, School of Engineering, Cochin University of Science and Technology (CUSAT). We are a collective of students united by curiosity, craft, and a shared pursuit of excellence in technology.',
    'Through technical events, workshops, industry engagements, and collaborative initiatives, SAIT bridges the gap between academic learning and professional practice — fostering a culture of innovation, mentorship, and community.',
  ],
  meta: [
    { term: 'Division',   detail: 'Information Technology' },
    { term: 'School',     detail: 'School of Engineering, CUSAT' },
    { term: 'Location',   detail: 'Kochi, Kerala, India' },
  ],
  imageAlt: 'Students collaborating — placeholder for SAIT/CUSAT photography',
};

/* ─────────────────────────────────────────────────────────────────────────
   Component
───────────────────────────────────────────────────────────────────────── */
export default function AboutSAIT() {
  const sectionRef    = useRef(null);
  const labelRef      = useRef(null);
  const headingRef    = useRef(null);
  const imageWrapRef  = useRef(null);
  const burgundyRef   = useRef(null);
  const bodyRef       = useRef(null);
  const metaRef       = useRef(null);
  const rulerRef      = useRef(null);

  useEffect(() => {
    const ease = 'power3.out';

    const ctx = gsap.context(() => {

      /* 1 — Editorial label + section ruler */
      gsap.from([rulerRef.current, labelRef.current], {
        scrollTrigger: { trigger: labelRef.current, start: 'top 88%', once: true },
        opacity: 0,
        y: 12,
        duration: 0.9,
        stagger: 0.12,
        ease,
      });

      /* 2 — Large heading slides up */
      gsap.from(headingRef.current.querySelectorAll('.about-heading-line'), {
        scrollTrigger: { trigger: headingRef.current, start: 'top 85%', once: true },
        y: 60,
        opacity: 0,
        duration: 1.1,
        stagger: 0.18,
        ease,
      });

      /* 3 — Image reveals with clip-path wipe */
      gsap.fromTo(
        imageWrapRef.current,
        { clipPath: 'inset(0% 0% 100% 0%)' },
        {
          scrollTrigger: { trigger: imageWrapRef.current, start: 'top 78%', once: true },
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 1.3,
          ease,
        }
      );

      /* 4 — Burgundy block slides in slightly after image */
      gsap.from(burgundyRef.current, {
        scrollTrigger: { trigger: burgundyRef.current, start: 'top 82%', once: true },
        x: -40,
        opacity: 0,
        duration: 1.0,
        delay: 0.2,
        ease,
      });

      /* 5 — Body copy + meta fade up */
      gsap.from([bodyRef.current, metaRef.current], {
        scrollTrigger: { trigger: bodyRef.current, start: 'top 86%', once: true },
        y: 24,
        opacity: 0,
        duration: 0.95,
        stagger: 0.14,
        ease,
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="about-section" ref={sectionRef} id="about">

      {/* ── Section header row: ruler + label ───────────────── */}
      <div className="about-header-row">
        <span className="about-ruler" ref={rulerRef} aria-hidden="true" />
        <span className="about-label" ref={labelRef}>
          {ABOUT_CONTENT.sectionNumber}&thinsp;—&thinsp;{ABOUT_CONTENT.sectionLabel}
        </span>
      </div>

      {/* ── Outer layout ────────────────────────────────────── */}
      <div className="about-outer">

        {/* LEFT: Large heading (desktop) / top (mobile) */}
        <div className="about-left">
          <h2 className="about-heading" ref={headingRef}>
            {ABOUT_CONTENT.headline.map((line, i) => (
              <span key={i} className="about-heading-line">{line}</span>
            ))}
          </h2>
        </div>

        {/* RIGHT: image + burgundy block stacked */}
        <div className="about-right">

          {/* Large editorial photograph */}
          <div className="about-image-wrap" ref={imageWrapRef}>
            <img
              src={images.aboutSAIT}
              alt={ABOUT_CONTENT.imageAlt}
              className="about-image"
              loading="lazy"
            />
            {/* Thin inset border — editorial detail */}
            <span className="about-image-border" aria-hidden="true" />
          </div>

          {/* Burgundy feature block — overlaps image bottom */}
          <div className="about-burgundy-block" ref={burgundyRef}>
            {ABOUT_CONTENT.featureStatement.map((line, i) => (
              <span key={i} className="about-burgundy-line">{line}</span>
            ))}
          </div>

        </div>{/* /about-right */}

      </div>{/* /about-outer */}

      {/* ── Body copy + meta ────────────────────────────────── */}
      <div className="about-body-row">

        {/* Spacer column mirrors the left heading width */}
        <div className="about-body-spacer" aria-hidden="true" />

        {/* Content column aligns under the right (image) column */}
        <div className="about-body-col">

          <div className="about-body" ref={bodyRef}>
            {ABOUT_CONTENT.body.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          <dl className="about-meta" ref={metaRef}>
            {ABOUT_CONTENT.meta.map(({ term, detail }) => (
              <div key={term} className="about-meta-item">
                <dt>{term}</dt>
                <dd>{detail}</dd>
              </div>
            ))}
          </dl>

        </div>{/* /about-body-col */}

      </div>{/* /about-body-row */}

    </section>
  );
}
