import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Bell, Calendar, AlertCircle } from 'lucide-react';
import {
  notificationsDisclaimer,
  notificationCategories,
  mockNotifications,
} from '../data/notificationsData';
import './Notifications.css';

gsap.registerPlugin(ScrollTrigger);

export default function Notifications() {
  const [activeCategory, setActiveCategory] = useState('ALL');

  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const filterRef = useRef(null);
  const listRef = useRef(null);

  const filteredNotifications =
    activeCategory === 'ALL'
      ? mockNotifications
      : mockNotifications.filter((n) => n.category === activeCategory);

  useEffect(() => {
    const ease = 'power3.out';

    const ctx = gsap.context(() => {
      // 1 — Section header reveal
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

      // 2 — Notification rows reveal
      gsap.from(listRef.current.querySelectorAll('.notif-row-item'), {
        scrollTrigger: {
          trigger: listRef.current,
          start: 'top 82%',
          once: true,
        },
        y: 25,
        opacity: 0,
        duration: 0.8,
        stagger: 0.06,
        ease,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Filter change subtle animation
  useEffect(() => {
    if (!listRef.current) return;
    const rows = listRef.current.querySelectorAll('.notif-row-item');
    gsap.fromTo(
      rows,
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.35, stagger: 0.04, ease: 'power2.out' }
    );
  }, [activeCategory]);

  return (
    <section className="notifications-section" ref={sectionRef} id="notifications">
      <div className="notifications-container">

        {/* ── 1. Section Header ────────────────────────────── */}
        <header className="notifications-header" ref={headerRef}>
          <div className="notifications-header-meta gsap-reveal-header">
            <span className="notif-label-num">14</span>
            <span className="notif-label-divider">—</span>
            <span className="notif-label-text">UPDATES</span>
            <span className="notif-badge-prototype">Notice Board</span>
          </div>

          <div className="notifications-header-main">
            <h2 className="notifications-heading gsap-reveal-header">
              Stay in the loop.
            </h2>
            <p className="notifications-intro-body gsap-reveal-header">
              Important announcements, event updates and deadlines from the SAIT community.
            </p>
          </div>
        </header>

        {/* ── 2. Filters & List Controls ──────────────────── */}
        <div className="notifications-list-wrapper">
          <div className="notifications-filter-row" ref={filterRef}>
            <div className="notifications-count-block">
              <Bell size={15} className="notif-bell-icon" aria-hidden="true" />
              <span className="notif-showing-text">
                Showing {filteredNotifications.length} {filteredNotifications.length === 1 ? 'Notice' : 'Notices'}
              </span>
            </div>

            {/* Category Filter Pills */}
            <div className="notifications-filter-bar" role="tablist" aria-label="Notification Categories">
              {notificationCategories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  role="tab"
                  aria-selected={activeCategory === cat}
                  className={`notif-filter-btn ${activeCategory === cat ? 'active' : ''}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* ── 3. Compact Editorial Notification List ──────── */}
          <div className="notifications-items-list" ref={listRef} role="list">
            {filteredNotifications.length === 0 ? (
              <div className="notif-empty-state">
                <p>No announcements in this category at this time.</p>
              </div>
            ) : (
              filteredNotifications.map((item) => (
                <a
                  key={item.id}
                  href={item.link}
                  className="notif-row-item"
                  role="listitem"
                  aria-label={`${item.category}: ${item.title}`}
                >
                  {/* Category & Urgent Indicator */}
                  <div className="notif-col-category">
                    <span className={`notif-category-tag ${item.category.toLowerCase()}`}>
                      {item.category}
                    </span>
                    {item.urgent && (
                      <span className="notif-urgent-pill">
                        <AlertCircle size={12} aria-hidden="true" />
                        Deadline
                      </span>
                    )}
                  </div>

                  {/* Title & Description */}
                  <div className="notif-col-content">
                    <h3 className="notif-title">{item.title}</h3>
                    <p className="notif-desc">{item.description}</p>
                  </div>

                  {/* Date & Interactive Action */}
                  <div className="notif-col-meta">
                    <div className="notif-date-wrap">
                      <Calendar size={13} className="notif-cal-icon" aria-hidden="true" />
                      <span className="notif-date">{item.date}</span>
                    </div>

                    <div className="notif-arrow-wrap" aria-hidden="true">
                      <span className="notif-action-text">Read</span>
                      <ArrowUpRight size={16} className="notif-arrow-icon" />
                    </div>
                  </div>
                </a>
              ))
            )}
          </div>

          <div className="notifications-footnote">
            <span className="notif-footnote-dot" aria-hidden="true" />
            <span>{notificationsDisclaimer}</span>
          </div>
        </div>

      </div>{/* /notifications-container */}
    </section>
  );
}
