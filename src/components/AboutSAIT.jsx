import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { animateReveal } from '../utils/animations';
import { aboutContent } from '../data/aboutData';
import { images } from '../data/images';
import './AboutSAIT.css';

gsap.registerPlugin(ScrollTrigger);

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
      animateReveal([rulerRef.current, labelRef.current], {
        trigger: labelRef.current,
        start: 'top 88%',
        y: 12,
        duration: 0.9,
        stagger: 0.12,
        ease,
      });

      /* 2 — Large heading slides up */
      animateReveal(headingRef.current.querySelectorAll('.about-heading-line'), {
        trigger: headingRef.current,
        start: 'top 85%',
        y: 60,
        duration: 1.1,
        stagger: 0.18,
        ease,
      });

      /* 3 — Image reveals with clip-path wipe */
      animateReveal(imageWrapRef.current, {
        trigger: imageWrapRef.current,
        start: 'top 78%',
        clipPath: { from: 'inset(0% 0% 100% 0%)', to: 'inset(0% 0% 0% 0%)' },
        duration: 1.3,
        ease,
      });

      /* 4 — Burgundy block slides in slightly after image */
      animateReveal(burgundyRef.current, {
        trigger: burgundyRef.current,
        start: 'top 82%',
        x: -40,
        y: 0,
        duration: 1.0,
        delay: 0.2,
        ease,
      });

      /* 5 — Body copy + meta fade up */
      animateReveal([bodyRef.current, metaRef.current], {
        trigger: bodyRef.current,
        start: 'top 86%',
        y: 24,
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
          {aboutContent.sectionNumber}&thinsp;—&thinsp;{aboutContent.sectionLabel}
        </span>
      </div>

      {/* ── Outer layout ────────────────────────────────────── */}
      <div className="about-outer">

        {/* LEFT: Large heading (desktop) / top (mobile) */}
        <div className="about-left">
          <h2 className="about-heading" ref={headingRef}>
            {aboutContent.headline.map((line, i) => (
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
              alt={aboutContent.imageAlt}
              className="about-image"
              loading="lazy"
            />
            {/* Thin inset border — editorial detail */}
            <span className="about-image-border" aria-hidden="true" />
          </div>

          {/* Burgundy feature block — overlaps image bottom */}
          <div className="about-burgundy-block" ref={burgundyRef}>
            {aboutContent.featureStatement.map((line, i) => (
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
            {aboutContent.body.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          <dl className="about-meta" ref={metaRef}>
            {aboutContent.meta.map(({ term, detail }) => (
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
