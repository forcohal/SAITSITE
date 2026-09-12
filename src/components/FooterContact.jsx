import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { animateReveal } from '../utils/animations';
import {
  Send,
  Mail,
  Phone,
  MapPin,
  CheckCircle2,
  ArrowUpRight,
  ArrowUp,
} from 'lucide-react';
import { contactInfo, socialLinks, footerNav } from '../data/contactData';
import './FooterContact.css';

gsap.registerPlugin(ScrollTrigger);

export default function FooterContact() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const contactSectionRef = useRef(null);
  const headerRef = useRef(null);
  const infoRef = useRef(null);
  const formRef = useRef(null);
  const footerRef = useRef(null);

  useEffect(() => {
    const ease = 'power3.out';

    const ctx = gsap.context(() => {
      // 1 — Contact header reveal
      animateReveal(headerRef.current.querySelectorAll('.gsap-reveal-header'), {
        trigger: headerRef.current,
        start: 'top 85%',
        y: 40,
        duration: 1.0,
        stagger: 0.14,
        ease,
      });

      // 2 — Info & Form reveal
      animateReveal([infoRef.current, formRef.current], {
        trigger: infoRef.current,
        start: 'top 82%',
        y: 30,
        duration: 0.9,
        stagger: 0.15,
        ease,
      });

      // 3 — Footer elements reveal
      animateReveal(footerRef.current.querySelectorAll('.gsap-reveal-footer'), {
        trigger: footerRef.current,
        start: 'top 88%',
        y: 25,
        duration: 0.8,
        stagger: 0.1,
        ease,
      });
    }, contactSectionRef);

    return () => ctx.revert();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formState.name.trim() || !formState.email.trim() || !formState.message.trim()) {
      return;
    }
    setSubmitted(true);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFooterNavClick = (e, href) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    if (targetId === 'home') {
      scrollToTop();
      return;
    }
    const target = document.getElementById(targetId);
    if (target) {
      const headerHeight = parseInt(
        getComputedStyle(document.documentElement).getPropertyValue('--header-height'),
        10
      ) || 80;
      const top = target.getBoundingClientRect().top + window.scrollY - headerHeight;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <div className="contact-footer-group" ref={contactSectionRef}>

      {/* ── 1. Contact Section ───────────────────────────── */}
      <section className="contact-section" id="contact">
        <div className="contact-container">

          {/* Section Header */}
          <header className="contact-header" ref={headerRef}>
            <div className="contact-header-meta gsap-reveal-header">
              <span className="contact-label-num">15</span>
              <span className="contact-label-divider">—</span>
              <span className="contact-label-text">GET IN TOUCH</span>
            </div>

            <div className="contact-header-main">
              <h2 className="contact-heading gsap-reveal-header">
                Let's connect.
              </h2>
              <p className="contact-intro-body gsap-reveal-header">
                Have a question, idea or something you'd like to share with SAIT?
              </p>
            </div>
          </header>

          {/* Contact Layout Grid: Info & Map on Left, Form on Right */}
          <div className="contact-grid">

            {/* LEFT COLUMN: Contact Information & Location Map */}
            <div className="contact-info-col" ref={infoRef}>
              
              <div className="contact-institution-card">
                <span className="contact-card-badge">DEPARTMENT &amp; CAMPUS</span>
                <h3 className="contact-inst-name">{contactInfo.association}</h3>
                <p className="contact-inst-division">{contactInfo.division}</p>
                <p className="contact-inst-school">{contactInfo.institution}</p>
              </div>

              {/* Direct Touchpoints */}
              <div className="contact-touchpoints-list">
                <div className="touchpoint-row">
                  <Mail size={16} className="touchpoint-icon" aria-hidden="true" />
                  <div className="touchpoint-text">
                    <span className="touchpoint-label">EMAIL</span>
                    <a href={`mailto:${contactInfo.email}`} className="touchpoint-value">
                      {contactInfo.email}
                    </a>
                  </div>
                </div>

                <div className="touchpoint-row">
                  <Phone size={16} className="touchpoint-icon" aria-hidden="true" />
                  <div className="touchpoint-text">
                    <span className="touchpoint-label">CAMPUS BOARD</span>
                    <span className="touchpoint-value">{contactInfo.phone}</span>
                  </div>
                </div>

                <div className="touchpoint-row">
                  <MapPin size={16} className="touchpoint-icon" aria-hidden="true" />
                  <div className="touchpoint-text">
                    <span className="touchpoint-label">LOCATION</span>
                    <span className="touchpoint-value">{contactInfo.location}</span>
                  </div>
                </div>
              </div>

              {/* Map / Location UI Card */}
              <div className="contact-map-card">
                <div className="map-card-inner">
                  <div className="map-card-header">
                    <div className="map-pin-pulse" aria-hidden="true" />
                    <div>
                      <h4 className="map-inst-title">School of Engineering</h4>
                      <p className="map-inst-sub">Cochin University of Science and Technology (CUSAT)</p>
                    </div>
                  </div>

                  <p className="map-coords-note">
                    South Kalamassery, Kochi, Kerala, India — Pin: 682022
                  </p>

                  <a
                    href={contactInfo.mapUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="map-view-btn"
                    aria-label="View School of Engineering CUSAT location on Google Maps"
                  >
                    <span>View Location</span>
                    <ArrowUpRight size={15} aria-hidden="true" />
                  </a>
                </div>
              </div>

              {/* Social Channels */}
              <div className="contact-socials-block">
                <span className="socials-label">COMMUNITY CHANNELS</span>
                <div className="socials-links-row">
                  {socialLinks.map((s) => (
                    <a
                      key={s.name}
                      href={s.href}
                      className="contact-social-pill"
                      aria-label={s.label}
                    >
                      <span>{s.name}</span>
                      <ArrowUpRight size={13} aria-hidden="true" />
                    </a>
                  ))}
                </div>
              </div>

            </div>

            {/* RIGHT COLUMN: Contact Form */}
            <div className="contact-form-col" ref={formRef}>
              <div className="contact-form-card">
                <div className="form-card-header">
                  <h3 className="form-card-title">Send a Message</h3>
                  <p className="form-card-desc">
                    Reach out regarding student initiatives, collaborations, or general questions.
                  </p>
                </div>

                {submitted ? (
                  <div className="contact-success-state" role="alert">
                    <CheckCircle2 size={32} className="success-icon" aria-hidden="true" />
                    <h4 className="success-title">Message received — thank you!</h4>
                    <p className="success-desc">
                      Your note has been received in this demonstration environment. We appreciate you connecting with the SAIT team.
                    </p>
                    <button
                      type="button"
                      className="success-reset-btn"
                      onClick={() => {
                        setSubmitted(false);
                        setFormState({ name: '', email: '', subject: '', message: '' });
                      }}
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="contact-form-element" noValidate>
                    <div className="form-field-group">
                      <label htmlFor="contact-name" className="contact-form-label">
                        Name <span className="req">*</span>
                      </label>
                      <input
                        type="text"
                        id="contact-name"
                        name="name"
                        value={formState.name}
                        onChange={handleInputChange}
                        placeholder="Your full name"
                        className="contact-form-input"
                        required
                      />
                    </div>

                    <div className="form-field-group">
                      <label htmlFor="contact-email" className="contact-form-label">
                        Email <span className="req">*</span>
                      </label>
                      <input
                        type="email"
                        id="contact-email"
                        name="email"
                        value={formState.email}
                        onChange={handleInputChange}
                        placeholder="your.email@domain.com"
                        className="contact-form-input"
                        required
                      />
                    </div>

                    <div className="form-field-group">
                      <label htmlFor="contact-subject" className="contact-form-label">
                        Subject
                      </label>
                      <input
                        type="text"
                        id="contact-subject"
                        name="subject"
                        value={formState.subject}
                        onChange={handleInputChange}
                        placeholder="e.g. Student collaboration inquiry"
                        className="contact-form-input"
                      />
                    </div>

                    <div className="form-field-group">
                      <label htmlFor="contact-message" className="contact-form-label">
                        Message <span className="req">*</span>
                      </label>
                      <textarea
                        id="contact-message"
                        name="message"
                        rows={4}
                        value={formState.message}
                        onChange={handleInputChange}
                        placeholder="Write your note or question here..."
                        className="contact-form-textarea"
                        required
                      />
                    </div>

                    <button type="submit" className="contact-submit-btn">
                      <span>Send Message</span>
                      <Send size={15} aria-hidden="true" />
                    </button>

                    <p className="contact-form-note">
                      {contactInfo.note}
                    </p>
                  </form>
                )}
              </div>
            </div>

          </div>{/* /contact-grid */}

        </div>{/* /contact-container */}
      </section>

      {/* ── 2. Polished Editorial Footer ─────────────────── */}
      <footer className="site-footer" ref={footerRef} role="contentinfo">
        <div className="footer-container">

          {/* Top Brand & Scroll-to-Top Row */}
          <div className="footer-top-row gsap-reveal-footer">
            <div className="footer-brand-wrap">
              <a
                href="#home"
                onClick={(e) => handleFooterNavClick(e, '#home')}
                className="footer-brand-title"
              >
                SAIT
              </a>
              <span className="footer-brand-full">
                Students Association of Information Technology
              </span>
              <span className="footer-brand-dept">
                School of Engineering • Cochin University of Science and Technology
              </span>
            </div>

            <button
              type="button"
              className="footer-back-top"
              onClick={scrollToTop}
              aria-label="Back to top of page"
            >
              <span>TOP</span>
              <ArrowUp size={15} aria-hidden="true" />
            </button>
          </div>

          {/* Footer Navigation Grid */}
          <nav className="footer-nav-row gsap-reveal-footer" aria-label="Footer Navigation">
            <ul className="footer-nav-list">
              {footerNav.map((link) => (
                <li key={link.name} className="footer-nav-item">
                  <a
                    href={link.href}
                    className="footer-nav-link"
                    onClick={(e) => handleFooterNavClick(e, link.href)}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Footer Bottom Meta */}
          <div className="footer-bottom-row gsap-reveal-footer">
            <div className="footer-copy-block">
              <p className="footer-copyright">
                © 2026 SAIT. All rights reserved.
              </p>
              <p className="footer-challenge-note">
                Designed &amp; built for the SAIT Website Redesign Challenge.
              </p>
            </div>

            <div className="footer-socials-wrap">
              {socialLinks.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  className="footer-social-link"
                  aria-label={s.label}
                >
                  {s.name}
                </a>
              ))}
            </div>
          </div>

        </div>{/* /footer-container */}
      </footer>

    </div>
  );
}
