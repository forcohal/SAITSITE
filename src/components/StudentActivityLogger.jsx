import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  CheckCircle2,
  Clock,
  Upload,
  PlusCircle,
  Trophy,
  ExternalLink,
  ShieldCheck,
  Award,
  Sparkles,
} from 'lucide-react';
import {
  activityDisclaimer,
  activityDashboardStats,
  activityFilterCategories,
  initialActivities,
  leaderboardData,
} from '../data/activityData';
import './StudentActivityLogger.css';

gsap.registerPlugin(ScrollTrigger);

export default function StudentActivityLogger() {
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [activitiesList, setActivitiesList] = useState(initialActivities);
  const [stats, setStats] = useState(activityDashboardStats);

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    category: 'COMPETITIONS',
    role: '',
    proofLink: '',
    fileName: '',
  });

  const [submissionFeedback, setSubmissionFeedback] = useState(null);

  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const statsRef = useRef(null);
  const feedRef = useRef(null);
  const formRef = useRef(null);
  const leaderboardRef = useRef(null);

  const filteredActivities =
    activeFilter === 'ALL'
      ? activitiesList
      : activitiesList.filter((item) => item.category === activeFilter);

  useEffect(() => {
    const ease = 'power3.out';

    const ctx = gsap.context(() => {
      // 1 — Header reveal
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

      // 2 — Dashboard stats reveal
      gsap.from(statsRef.current.querySelectorAll('.act-stat-cell'), {
        scrollTrigger: {
          trigger: statsRef.current,
          start: 'top 85%',
          once: true,
        },
        y: 30,
        opacity: 0,
        duration: 0.85,
        stagger: 0.08,
        ease,
      });

      // 3 — Feed and Form reveal
      gsap.from([feedRef.current, formRef.current], {
        scrollTrigger: {
          trigger: feedRef.current,
          start: 'top 82%',
          once: true,
        },
        y: 30,
        opacity: 0,
        duration: 0.9,
        stagger: 0.15,
        ease,
      });

      // 4 — Leaderboard reveal
      gsap.from(leaderboardRef.current, {
        scrollTrigger: {
          trigger: leaderboardRef.current,
          start: 'top 85%',
          once: true,
        },
        y: 30,
        opacity: 0,
        duration: 0.9,
        ease,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Filter dynamic transition
  useEffect(() => {
    if (!feedRef.current) return;
    const items = feedRef.current.querySelectorAll('.act-feed-item');
    gsap.fromTo(
      items,
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.35, stagger: 0.03, ease: 'power2.out' }
    );
  }, [activeFilter]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileSimulate = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, fileName: file.name }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      return;
    }

    const newActivity = {
      id: `act-${Date.now()}`,
      title: formData.title.trim(),
      date: formData.date || 'Today',
      category: formData.category,
      role: formData.role.trim() || 'Participant',
      status: 'Pending',
      points: '50 pts (Review)',
      proofLink: formData.proofLink.trim() || '#',
    };

    // Prepend to live list
    setActivitiesList((prev) => [newActivity, ...prev]);

    // Update stats count dynamically
    setStats((prev) =>
      prev.map((s) =>
        s.id === 'stat-act' ? { ...s, value: String(parseInt(s.value, 10) + 1) } : s
      )
    );

    setSubmissionFeedback(
      `Activity "${formData.title}" logged successfully! Pending verification (Prototype).`
    );

    // Reset form
    setFormData({
      title: '',
      date: '',
      category: 'COMPETITIONS',
      role: '',
      proofLink: '',
      fileName: '',
    });

    setTimeout(() => {
      setSubmissionFeedback(null);
    }, 6000);
  };

  return (
    <section className="activity-section" ref={sectionRef} id="activity">
      <div className="activity-container">

        {/* ── 1. Section Header ────────────────────────────── */}
        <header className="activity-header" ref={headerRef}>
          <div className="activity-header-meta gsap-reveal-header">
            <span className="activity-label-num">13</span>
            <span className="activity-label-divider">—</span>
            <span className="activity-label-text">STUDENT ACTIVITY</span>
            <span className="activity-badge-prototype">Prototype Interface</span>
          </div>

          <div className="activity-header-main">
            <h2 className="activity-heading gsap-reveal-header">
              Your work. Your record.
            </h2>
            <p className="activity-intro-body gsap-reveal-header">
              Track events, projects, competitions and achievements throughout your student journey.
            </p>
          </div>
        </header>

        {/* ── 2. Compact Dashboard Stats ───────────────────── */}
        <div className="activity-stats-wrapper" ref={statsRef}>
          <div className="activity-stats-grid">
            {stats.map((st, idx) => (
              <div
                key={st.id}
                className={`act-stat-cell ${idx % 2 === 1 ? 'cell-accent' : 'cell-primary'}`}
              >
                <span className="act-stat-label">{st.label}</span>
                <span className="act-stat-value">{st.value}</span>
                <span className="act-stat-sub">{st.sublabel}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── 3. Main Operational Split: Feed + Submit UI ─── */}
        <div className="activity-workspace-grid">

          {/* LEFT: Activity Feed with Interactive Filter Tabs */}
          <div className="activity-feed-panel" ref={feedRef}>
            <div className="activity-feed-header">
              <div className="feed-title-block">
                <ShieldCheck size={16} className="feed-icon" aria-hidden="true" />
                <h3 className="feed-heading">Activity Record Feed</h3>
              </div>
              <span className="feed-count-badge">
                {filteredActivities.length} {filteredActivities.length === 1 ? 'Record' : 'Records'}
              </span>
            </div>

            {/* Filter Tabs */}
            <div className="activity-filter-bar" role="tablist" aria-label="Activity Categories">
              {activityFilterCategories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  role="tab"
                  aria-selected={activeFilter === cat}
                  className={`act-filter-btn ${activeFilter === cat ? 'active' : ''}`}
                  onClick={() => setActiveFilter(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* List of Activities */}
            <div className="activity-feed-list" role="list">
              {filteredActivities.length === 0 ? (
                <div className="act-empty-feed">
                  <p>No activity logs recorded under this category yet.</p>
                </div>
              ) : (
                filteredActivities.map((act) => {
                  const isVerified = act.status === 'Verified';
                  return (
                    <article key={act.id} className="act-feed-item" role="listitem">
                      <div className="act-feed-main">
                        <div className="act-feed-meta-top">
                          <span className="act-cat-tag">{act.category}</span>
                          <span className="act-date">{act.date}</span>
                          <span className="act-points-tag">{act.points}</span>
                        </div>

                        <h4 className="act-title">{act.title}</h4>

                        <div className="act-feed-details">
                          <span className="act-role">Role: <strong>{act.role}</strong></span>
                          {act.proofLink && act.proofLink !== '#' && (
                            <a
                              href={act.proofLink}
                              target="_blank"
                              rel="noreferrer"
                              className="act-proof-link"
                              aria-label={`View proof link for ${act.title}`}
                            >
                              <span>Proof</span>
                              <ExternalLink size={12} aria-hidden="true" />
                            </a>
                          )}
                        </div>
                      </div>

                      <div className="act-feed-status-wrap">
                        {isVerified ? (
                          <span className="act-status-pill verified">
                            <CheckCircle2 size={13} aria-hidden="true" />
                            Verified
                          </span>
                        ) : (
                          <span className="act-status-pill pending">
                            <Clock size={13} aria-hidden="true" />
                            Pending
                          </span>
                        )}
                      </div>
                    </article>
                  );
                })
              )}
            </div>
          </div>

          {/* RIGHT: Submit Activity Form (Frontend Prototype) */}
          <div className="activity-submit-panel" ref={formRef}>
            <div className="submit-panel-header">
              <div className="submit-title-block">
                <PlusCircle size={16} className="submit-icon" aria-hidden="true" />
                <h3 className="submit-heading">Submit Activity</h3>
              </div>
              <span className="submit-subtext">Log new participation or achievement for review</span>
            </div>

            {submissionFeedback && (
              <div className="submit-feedback-banner" role="alert">
                <Sparkles size={14} aria-hidden="true" />
                <span>{submissionFeedback}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="activity-form" noValidate>
              
              {/* Activity Name */}
              <div className="form-group">
                <label htmlFor="act-title" className="form-label">
                  Event / Activity Name <span className="req">*</span>
                </label>
                <input
                  type="text"
                  id="act-title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="e.g. National HackSprint 2026"
                  className="form-input"
                  required
                />
              </div>

              {/* Date & Type Row */}
              <div className="form-row-2">
                <div className="form-group">
                  <label htmlFor="act-date" className="form-label">Date</label>
                  <input
                    type="text"
                    id="act-date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    placeholder="e.g. Mar 12, 2026"
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="act-category" className="form-label">Activity Type</label>
                  <select
                    id="act-category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="form-select"
                  >
                    <option value="COMPETITIONS">Competitions</option>
                    <option value="WORKSHOPS">Workshops</option>
                    <option value="EVENTS">Events</option>
                    <option value="ACADEMIC">Academic</option>
                    <option value="PROJECTS">Projects</option>
                  </select>
                </div>
              </div>

              {/* Role */}
              <div className="form-group">
                <label htmlFor="act-role" className="form-label">Your Role</label>
                <input
                  type="text"
                  id="act-role"
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  placeholder="e.g. Team Lead / Participant / Presenter"
                  className="form-input"
                />
              </div>

              {/* Proof Upload (Simulation) */}
              <div className="form-group">
                <label className="form-label">Proof Upload (Certificate / Report)</label>
                <label className="file-upload-box">
                  <input
                    type="file"
                    className="file-hidden-input"
                    onChange={handleFileSimulate}
                    accept=".pdf,.png,.jpg,.jpeg"
                  />
                  <Upload size={18} className="upload-icon" aria-hidden="true" />
                  <span className="upload-text">
                    {formData.fileName ? (
                      <strong>Selected: {formData.fileName}</strong>
                    ) : (
                      'Click to attach file (PDF / PNG, max 10MB)'
                    )}
                  </span>
                  <span className="upload-note">Prototype file selector</span>
                </label>
              </div>

              {/* Proof Link */}
              <div className="form-group">
                <label htmlFor="act-proof-link" className="form-label">Proof Link (Repository / URL)</label>
                <input
                  type="url"
                  id="act-proof-link"
                  name="proofLink"
                  value={formData.proofLink}
                  onChange={handleInputChange}
                  placeholder="https://github.com/... or https://drive.google.com/..."
                  className="form-input"
                />
              </div>

              <button type="submit" className="submit-activity-btn">
                <span>Submit Activity</span>
                <Award size={16} aria-hidden="true" />
              </button>

              <p className="submit-proto-note">
                Note: Submitting simulates an immediate frontend update. No database or auth required.
              </p>
            </form>
          </div>

        </div>

        {/* ── 4. Leaderboard Section ───────────────────────── */}
        <div className="activity-leaderboard-wrapper" ref={leaderboardRef}>
          <div className="leaderboard-header">
            <div className="leaderboard-title-row">
              <Trophy size={18} className="leaderboard-icon" aria-hidden="true" />
              <h3 className="leaderboard-heading">ACTIVITY LEADERBOARD</h3>
            </div>
            <p className="leaderboard-desc">
              Top engaged student contributors across technical workshops, competitions, and department initiatives.
            </p>
          </div>

          <div className="leaderboard-table">
            <div className="leaderboard-head-row" aria-hidden="true">
              <span className="col-rank">RANK</span>
              <span className="col-name">STUDENT</span>
              <span className="col-id">IDENTIFIER</span>
              <span className="col-ver">VERIFIED ACTIVITIES</span>
              <span className="col-pts">POINTS</span>
            </div>

            {leaderboardData.map((lb) => (
              <div key={lb.rank} className="leaderboard-data-row">
                <span className="col-rank">
                  <span className={`rank-badge ${lb.rank === '01' ? 'rank-gold' : ''}`}>
                    {lb.rank}
                  </span>
                </span>
                <span className="col-name">{lb.name}</span>
                <span className="col-id">{lb.studentId}</span>
                <span className="col-ver">{lb.verifiedCount} Completed</span>
                <span className="col-pts">{lb.points}</span>
              </div>
            ))}
          </div>

          <div className="activity-footnote">
            <span className="activity-footnote-dot" aria-hidden="true" />
            <span>{activityDisclaimer}</span>
          </div>
        </div>

      </div>{/* /activity-container */}
    </section>
  );
}
