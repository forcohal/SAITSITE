/**
 * Navigation utility to handle smooth scrolling across sections
 * while accounting for the fixed header height.
 */
export function scrollToSection(sectionId, onComplete) {
  if (!sectionId) return;

  if (sectionId === 'home') {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (typeof onComplete === 'function') onComplete();
    return;
  }

  const target = document.getElementById(sectionId);
  if (!target) return;

  const headerHeight =
    parseInt(
      getComputedStyle(document.documentElement).getPropertyValue('--header-height'),
      10
    ) || 80;

  const top = target.getBoundingClientRect().top + window.scrollY - headerHeight;
  window.scrollTo({ top, behavior: 'smooth' });

  if (typeof onComplete === 'function') onComplete();
}
