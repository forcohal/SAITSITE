import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { images } from '../data/images';
import './History.css';

gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────────────────────────────────────────────────────────
   Static content — strictly factual per the source material
───────────────────────────────────────────────────────────────────────── */
const HISTORY_INTRO = {
  label: 'HISTORY',
  heading: 'HOW WE GOT\nHERE',
  body: 'The story of the Information Technology Division and SAIT is one of continuous evolution—built around technology, collaborative learning, and active student participation.',
};

const HISTORY_NODES = [
  {
    id: 'origin',
    meta: '01 / ORIGIN',
    year: '1995',
    title: 'IT DIVISION',
    text: 'The Information Technology Division was established/instituted at the School of Engineering, CUSAT, laying the academic foundation for technology education.',
  },
  {
    id: 'association',
    meta: '02 / THE ASSOCIATION',
    year: '',
    title: 'SAIT',
    text: 'Operating as a student-driven organization with steadfast support from IT faculty and staff, SAIT emerged as the core community for the department.',
  },
  {
    id: 'student-life',
    meta: '03 / STUDENT LIFE',
    year: '',
    title: 'BEYOND THE CLASSROOM',
    text: 'The association cultivates a vibrant technical culture through workshops, seminars, hands-on projects, alumni interactions, and open student forums.',
  },
];

/* ─────────────────────────────────────────────────────────────────────────
   Component
───────────────────────────────────────────────────────────────────────── */
export default function History() {
  const sectionRef    = useRef(null);
  const bgTextRef     = useRef(null);
  const introRef      = useRef(null);
  const lineRef       = useRef(null);
  const timelineRef   = useRef(null);
  const imageWrapRef  = useRef(null);
  const nodesRef      = useRef([]);

  useEffect(() => {
    const ease = 'power3.out';
    const ctx = gsap.context(() => {
      
      // 1 — Subtle Parallax for the giant background text
      gsap.to(bgTextRef.current, {
        y: 120,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });

      // 2 — Intro block reveal
      gsap.from(introRef.current.children, {
        scrollTrigger: { trigger: introRef.current, start: 'top 85%', once: true },
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease,
      });

      // 3 — Vertical timeline line draws progressively as you scroll down
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: timelineRef.current,
            start: 'top 75%',
            end: 'bottom 85%',
            scrub: true,
          },
        }
      );

      // 4 — Nodes reveal sequentially
      nodesRef.current.forEach((node, i) => {
        const marker = node.querySelector('.history-marker');
        const reveals = node.querySelectorAll('.gsap-reveal');
        
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: node,
            start: 'top 80%',
            once: true,
          },
        });

        // Pop in the dot and branch
        tl.from(marker, {
          scale: 0,
          opacity: 0,
          duration: 0.6,
          ease: 'back.out(1.5)',
        })
        // Fade up the text content
        .from(reveals, {
          y: 20,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease,
        }, '-=0.3');
      });

      // 5 — Optional image clip reveal
      if (imageWrapRef.current) {
        gsap.fromTo(
          imageWrapRef.current,
          { clipPath: 'inset(100% 0% 0% 0%)' },
          {
            scrollTrigger: { trigger: imageWrapRef.current, start: 'top 80%', once: true },
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 1.3,
            ease,
          }
        );
      }

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="history-section" ref={sectionRef} id="history">
      
      {/* ── Giant faded background typography ─────────────────── */}
      <div className="history-bg-text" ref={bgTextRef} aria-hidden="true">
        1995
      </div>

      <div className="history-container">
        
        {/* ── Section Intro ───────────────────────────────────── */}
        <div className="history-intro" ref={introRef}>
          <span className="history-label">{HISTORY_INTRO.label}</span>
          <h2 className="history-heading">
            {HISTORY_INTRO.heading.split('\n').map((line, i) => (
              <span key={i} className="history-heading-line">{line}</span>
            ))}
          </h2>
          <p className="history-intro-body">{HISTORY_INTRO.body}</p>
        </div>

        {/* ── Main Content Split (Timeline + Image) ───────────── */}
        <div className="history-content-split">
          
          {/* LEFT: The Timeline */}
          <div className="history-timeline" ref={timelineRef}>
            {/* The vertical tracking line */}
            <div className="history-line" ref={lineRef} aria-hidden="true" />

            {/* Timeline Nodes */}
            {HISTORY_NODES.map((node, i) => (
              <div 
                className="history-node" 
                key={node.id}
                ref={(el) => (nodesRef.current[i] = el)}
              >
                {/* Marker (Dot + Branch) */}
                <div className="history-marker" aria-hidden="true">
                  <div className="history-dot" />
                  <div className="history-branch" />
                </div>

                {/* Content */}
                <div className="history-node-content">
                  <span className="history-meta gsap-reveal">{node.meta}</span>
                  <h3 className="history-title gsap-reveal">
                    {node.year && <span className="history-year">{node.year}</span>}
                    {node.title}
                  </h3>
                  <p className="history-text gsap-reveal">{node.text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT: Sticky Editorial Image */}
          <div className="history-image-col">
            <div className="history-image-wrap" ref={imageWrapRef}>
              <img
                src={images.history}
                alt="Students collaborating — history placeholder"
                className="history-image"
                loading="lazy"
              />
              <span className="history-image-border" aria-hidden="true" />
            </div>
          </div>

        </div>{/* /history-content-split */}

      </div>{/* /history-container */}
    </section>
  );
}
