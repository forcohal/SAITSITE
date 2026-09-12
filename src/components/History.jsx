import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { animateReveal } from '../utils/animations';
import { historyIntro, historyTimelineNodes } from '../data/historyData';
import { images } from '../data/images';
import './History.css';

gsap.registerPlugin(ScrollTrigger);

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
      animateReveal(introRef.current.children, {
        trigger: introRef.current,
        start: 'top 85%',
        y: 40,
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
      nodesRef.current.forEach((node) => {
        const marker = node.querySelector('.history-marker');
        const reveals = node.querySelectorAll('.gsap-reveal');
        
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: node,
            start: 'top 80%',
            toggleActions: 'play none none none',
            fastScrollEnd: true,
          },
        });

        // Pop in the dot and branch
        tl.from(marker, {
          scale: 0,
          opacity: 0,
          duration: 0.6,
          ease: 'back.out(1.5)',
          clearProps: 'opacity,transform',
        })
        // Fade up the text content
        .from(reveals, {
          y: 20,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease,
          clearProps: 'opacity,transform',
        }, '-=0.3');
      });

      // 5 — Optional image clip reveal
      if (imageWrapRef.current) {
        animateReveal(imageWrapRef.current, {
          trigger: imageWrapRef.current,
          start: 'top 80%',
          clipPath: { from: 'inset(100% 0% 0% 0%)', to: 'inset(0% 0% 0% 0%)' },
          duration: 1.3,
          ease,
        });
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
          <span className="history-label">{historyIntro.label}</span>
          <h2 className="history-heading">
            {historyIntro.heading.split('\n').map((line, i) => (
              <span key={i} className="history-heading-line">{line}</span>
            ))}
          </h2>
          <p className="history-intro-body">{historyIntro.body}</p>
        </div>

        {/* ── Main Content Split (Timeline + Image) ───────────── */}
        <div className="history-content-split">
          
          {/* LEFT: The Timeline */}
          <div className="history-timeline" ref={timelineRef}>
            {/* The vertical tracking line */}
            <div className="history-line" ref={lineRef} aria-hidden="true" />

            {/* Timeline Nodes */}
            {historyTimelineNodes.map((node, i) => (
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
