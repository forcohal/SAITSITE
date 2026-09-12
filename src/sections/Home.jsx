import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

import Header from '../components/Header';
import Hero from '../components/Hero';
import Stats from '../components/Stats';
import AboutSAIT from '../components/AboutSAIT';
import Department from '../components/Department';
import History from '../components/History';
import VisionMission from '../components/VisionMission';
import FacultyAdministration from '../components/FacultyAdministration';
import AcademicResources from '../components/AcademicResources';
import AssociationPeople from '../components/AssociationPeople';
import EventsActivities from '../components/EventsActivities';
import PlacementsCareers from '../components/PlacementsCareers';
import Alumni from '../components/Alumni';
import HallOfFame from '../components/HallOfFame';
import StudentActivityLogger from '../components/StudentActivityLogger';
import Notifications from '../components/Notifications';
import FooterContact from '../components/FooterContact';
import './Home.css';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const statsRef = useRef(null);

  useGSAP(() => {
    const heroTitle = heroRef.current.querySelector('#hero-title');
    const heroSubtitle = heroRef.current.querySelector('#hero-subtitle');
    const heroContent = heroRef.current.querySelector('#hero-content');
    const headerEl = document.querySelector('#site-header');

    // 1. Initial Page Load Animation
    const introTl = gsap.timeline();

    introTl
      .to(heroTitle, {
        opacity: 1,
        duration: 1.5,
        ease: "power2.out",
      })
      .fromTo(heroSubtitle, 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1.2, ease: "power2.out" },
        "-=0.75"
      )
      .to(headerEl, {
        opacity: 1,
        autoAlpha: 1,
        duration: 1,
        ease: "power2.out"
      }, "+=0.5");

    // 2. Scroll Transition Animation (Hero)
    // Pin the hero section and translate the text up as the user scrolls
    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "+=100%", // Scroll for 100vh to move it up
        scrub: 1,
        pin: true, 
      }
    });

    scrollTl
      .to(heroContent, {
        yPercent: -150, // Move text up and out of view
        opacity: 0, 
        ease: "none"
      });

    // 3. Stats Section Animation
    // Fade in the stats section as it comes into view naturally after the pinned hero unpins
    gsap.to(statsRef.current, {
      scrollTrigger: {
        trigger: statsRef.current,
        start: "top 80%",
        end: "top 40%",
        scrub: 1
      },
      opacity: 1,
      ease: "none"
    });

  }, { scope: containerRef });

  return (
    <div className="home-container" ref={containerRef}>
      <Header />
      <Hero ref={heroRef} />
      <Stats ref={statsRef} />
      <AboutSAIT />
      <Department />
      <History />
      <VisionMission />
      <FacultyAdministration />
      <AcademicResources />
      <AssociationPeople />
      <EventsActivities />
      <PlacementsCareers />
      <Alumni />
      <HallOfFame />
      <StudentActivityLogger />
      <Notifications />
      <FooterContact />
    </div>
  );
}
