import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import './Header.css';

const navLinks = [
  { name: 'Home',         href: '#home',          id: 'home',          implemented: true },
  { name: 'About',        href: '#about',         id: 'about',         implemented: true },
  { name: 'Department',   href: '#department',    id: 'department',    implemented: true },
  { name: 'People',       href: '#people',        id: 'people',        implemented: true },
  { name: 'Events',       href: '#events',        id: 'events',        implemented: true },
  { name: 'Careers',      href: '#careers',       id: 'careers',       implemented: true },
  { name: 'Alumni',       href: '#alumni',        id: 'alumni',        implemented: true },
  { name: 'Hall of Fame', href: '#hall-of-fame',  id: 'hall-of-fame',  implemented: true },
  { name: 'Activity',     href: '#activity',      id: 'activity',      implemented: true },
  { name: 'Updates',      href: '#notifications', id: 'notifications', implemented: true },
  { name: 'Contact',      href: '#contact',       id: 'contact',       implemented: true },
];

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState('home');

  useEffect(() => {
    const trackedSections = [
      { navId: 'home',          elementId: 'home' },
      { navId: 'about',         elementId: 'about' },
      { navId: 'department',    elementId: 'department' },
      { navId: 'people',        elementId: 'people' },
      { navId: 'events',        elementId: 'events' },
      { navId: 'careers',       elementId: 'careers' },
      { navId: 'alumni',        elementId: 'alumni' },
      { navId: 'hall-of-fame',  elementId: 'hall-of-fame' },
      { navId: 'activity',      elementId: 'activity' },
      { navId: 'notifications', elementId: 'notifications' },
      { navId: 'contact',       elementId: 'contact' },
    ];

    const handleScroll = () => {
      const headerHeight = parseInt(
        getComputedStyle(document.documentElement).getPropertyValue('--header-height'),
        10
      ) || 80;

      // 1. If at or near top
      if (window.scrollY < 160) {
        setActiveId('home');
        return;
      }

      // 2. If at bottom of page, highlight the last section
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 50) {
        setActiveId('contact');
        return;
      }

      // 3. Find current section in view (bottom to top check)
      for (let i = trackedSections.length - 1; i >= 0; i--) {
        const item = trackedSections[i];
        const el = document.getElementById(item.elementId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= headerHeight + 120) {
            setActiveId(item.navId);
            return;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, link, onAfter) => {
    e.preventDefault();

    if (!link.implemented) {
      // Unimplemented sections remain inert and do not jump
      return;
    }

    if (link.id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setActiveId('home');
      if (typeof onAfter === 'function') onAfter();
      return;
    }

    const target = document.getElementById(link.id);
    if (!target) return;

    const headerHeight = parseInt(
      getComputedStyle(document.documentElement).getPropertyValue('--header-height'),
      10
    ) || 80;

    const top = target.getBoundingClientRect().top + window.scrollY - headerHeight;

    window.scrollTo({ top, behavior: 'smooth' });
    setActiveId(link.id);

    if (typeof onAfter === 'function') onAfter();
  };

  return (
    <header className="header-container" id="site-header">
      <div className="header-inner">
        {/* Brand - Left */}
        <div className="header-brand">
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, { id: 'home', implemented: true })}
          >
            SAIT
          </a>
        </div>

        {/* Navigation - Right (Desktop) */}
        <nav className="header-nav" aria-label="Main Navigation">
          <ul>
            {navLinks.map((link) => {
              const isActive = activeId === link.id && link.implemented;
              return (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className={`nav-link ${isActive ? 'active' : ''} ${
                      !link.implemented ? 'disabled' : ''
                    }`}
                    title={!link.implemented ? `${link.name} section coming soon` : undefined}
                    aria-current={isActive ? 'page' : undefined}
                    onClick={(e) => handleNavClick(e, link)}
                  >
                    {link.name}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="mobile-menu-btn"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? 'Close mobile menu' : 'Open mobile menu'}
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="mobile-nav-drawer" role="dialog" aria-modal="true">
          <nav aria-label="Mobile Navigation">
            <ul>
              {navLinks.map((link) => {
                const isActive = activeId === link.id && link.implemented;
                return (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className={`mobile-nav-link ${isActive ? 'active' : ''} ${
                        !link.implemented ? 'disabled' : ''
                      }`}
                      title={!link.implemented ? `${link.name} section coming soon` : undefined}
                      aria-current={isActive ? 'page' : undefined}
                      onClick={(e) =>
                        handleNavClick(e, link, () => setIsMobileMenuOpen(false))
                      }
                    >
                      <span className="mobile-nav-name">{link.name}</span>
                      {!link.implemented && (
                        <span className="mobile-nav-badge">Soon</span>
                      )}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}
