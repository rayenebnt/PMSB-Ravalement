"use client";

import React, { useState, useEffect, useRef } from "react";
import Contact from "@/components/Contact";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./Home.css";

/* ═══════════════════════════════════════════════════
   FLOATING 3D CUBE — wireframe decoration
═══════════════════════════════════════════════════ */
interface CubeProps {
  size: number; duration: number; delay: number;
  top?: string; left?: string; right?: string; bottom?: string;
}
const FloatingCube: React.FC<CubeProps> = ({ size, duration, delay, top, left, right, bottom }) => (
  <div
    className="floating-cube"
    style={{
      "--size": `${size}px`, "--half": `${size / 2}px`,
      width: size, height: size,
      top, left, right, bottom,
      animationDuration: `${duration}s`,
      animationDelay: `${delay}s`,
    } as React.CSSProperties}
  >
    {(["front","back","right","left","top","bottom"] as const).map(f => (
      <div key={f} className={`cube-face ${f}`} />
    ))}
  </div>
);

/* ═══════════════════════════════════════════════════
   COUNT-UP NUMBER ANIMATION
═══════════════════════════════════════════════════ */
const CountUp: React.FC<{ target: number; suffix?: string; active: boolean }> = ({
  target, suffix = "", active,
}) => {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    const dur = 2200;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - t, 4);
      setVal(Math.round(eased * target));
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [active, target]);
  return <>{val}{suffix}</>;
};

/* ═══════════════════════════════════════════════════
   SERVICE CARD — large image with hover reveal
═══════════════════════════════════════════════════ */
interface ServiceCardProps {
  number: string; image: string;
  title: string; description: string; href?: string;
}
const ServiceCard: React.FC<ServiceCardProps> = ({ number, image, title, description, href }) => {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const rx = ((r.height / 2 - (e.clientY - r.top))  / (r.height / 2)) * 8;
    const ry = ((e.clientX - r.left - r.width / 2) / (r.width  / 2)) * 8;
    el.style.transition = "transform 0.1s ease, box-shadow 0.4s ease";
    el.style.transform   = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`;
  };
  const onLeave = () => {
    const el = ref.current; if (!el) return;
    el.style.transition = "transform 0.65s cubic-bezier(0.16,1,0.3,1), box-shadow 0.4s ease";
    el.style.transform  = "perspective(900px) rotateX(0deg) rotateY(0deg)";
  };

  return (
    <div ref={ref} className="service-card" onMouseMove={onMove} onMouseLeave={onLeave}>
      <img src={image} alt={title} className="service-card-img" />
      <div className="service-card-overlay" />
      <div className="service-card-content">
        <span className="service-card-number">{number}</span>
        <div className="service-card-line" />
        <h3 className="service-card-title">{title}</h3>
        <p className="service-card-desc">{description}</p>
        {href && (
          <a href={href} className="service-card-link">
            En savoir plus <span className="service-card-arrow">→</span>
          </a>
        )}
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════
   3D COVERFLOW CAROUSEL
═══════════════════════════════════════════════════ */
const slides = [
  { imageUrl: "/qui1.jpg",       text: "Piochage total et refait en Saint Acier, Paris 75018" },
  { imageUrl: "/imagebien3.JPG", text: "Ravalement Chaux Sable, Paris 75008" },
  { imageUrl: "/image_real.JPG", text: "Travaux de Ravalement et de Zinguerie, Paris 75002" },
];

const Carousel: React.FC = () => {
  const [cur, setCur] = useState(0);
  const len = slides.length;

  const getStyle = (i: number): React.CSSProperties => {
    let d = i - cur;
    if (d > len / 2)  d -= len;
    if (d < -len / 2) d += len;
    if (d === 0)  return { transform: "translateX(-50%) rotateY(0deg)   translateZ(0px)    scale(1)",    opacity: 1,    zIndex: 10, pointerEvents: "auto" };
    if (d === 1)  return { transform: "translateX(-10%) rotateY(-48deg) translateZ(-165px) scale(0.82)", opacity: 0.50, zIndex: 5,  pointerEvents: "none" };
    if (d === -1) return { transform: "translateX(-90%) rotateY(48deg)  translateZ(-165px) scale(0.82)", opacity: 0.50, zIndex: 5,  pointerEvents: "none" };
    return                { transform: "translateX(-50%)                 translateZ(-350px) scale(0.6)",  opacity: 0,    zIndex: 1,  pointerEvents: "none" };
  };

  return (
    <div className="carousel-3d-container">
      <div className="carousel-3d-track">
        {slides.map((s, i) => (
          <div
            key={i} className="slide-3d"
            style={{ ...getStyle(i), transition: "transform 0.72s cubic-bezier(0.25,0.46,0.45,0.94), opacity 0.72s ease" }}
          >
            <img src={s.imageUrl} alt={`Réalisation ${i + 1}`} />
            <p className="slide-caption">{s.text}</p>
          </div>
        ))}
      </div>
      <button className="nav-btn nav-prev" onClick={() => setCur(p => (p - 1 + len) % len)} aria-label="Précédent">❮</button>
      <button className="nav-btn nav-next" onClick={() => setCur(p => (p + 1) % len)}        aria-label="Suivant">❯</button>
      <div className="carousel-dots">
        {slides.map((_, i) => (
          <button key={i} className={`dot ${i === cur ? "active" : ""}`} onClick={() => setCur(i)} aria-label={`Slide ${i + 1}`} />
        ))}
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════
   PAGE
═══════════════════════════════════════════════════ */
export default function Home() {
  const [statsActive, setStatsActive] = useState(false);
  const statsRef = useRef<HTMLElement>(null);

  useEffect(() => {
    /* Scroll reveal */
    const revealObs = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    document.querySelectorAll(".reveal, .reveal-left, .reveal-right")
      .forEach(el => revealObs.observe(el));

    /* Stats counter trigger */
    const statsObs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setStatsActive(true); }),
      { threshold: 0.3 }
    );
    if (statsRef.current) statsObs.observe(statsRef.current);

    return () => { revealObs.disconnect(); statsObs.disconnect(); };
  }, []);

  return (
    <div id="PageContainer">
      <main>

        {/* ── Navbar ── */}
        <div id="FixedNavbar"><Navbar /></div>

        {/* ══════════════════════════════════════════
            HERO
        ══════════════════════════════════════════ */}
        <section id="FullScreenSection">

          {/* Animated perspective grid */}
          <div className="hero-grid" aria-hidden="true" />

          {/* 3D wireframe cubes */}
          <div className="hero-shapes" aria-hidden="true">
            <FloatingCube size={60}  top="11%"    left="6%"    duration={13} delay={0}   />
            <FloatingCube size={36}  top="18%"    right="8%"   duration={9}  delay={1.5} />
            <FloatingCube size={80}  bottom="24%" left="10%"   duration={18} delay={0.5} />
            <FloatingCube size={26}  top="55%"    right="13%"  duration={8}  delay={2.5} />
            <FloatingCube size={50}  top="65%"    left="66%"   duration={12} delay={1}   />
            <FloatingCube size={22}  top="30%"    left="80%"   duration={10} delay={3}   />
            <FloatingCube size={42}  bottom="10%" right="22%"  duration={15} delay={2}   />
            <FloatingCube size={32}  top="42%"    left="2%"    duration={11} delay={3.5} />
          </div>

          {/* Content */}
          <div className="hero-content">
            <p className="hero-eyebrow">Entreprise de ravalement et de façade</p>

            <h1 className="hero-title" aria-label="PMSB">
              {"PMSB".split("").map((ch, i) => (
                <span
                  key={i} className="hero-char"
                  style={{ animationDelay: `${0.62 + i * 0.1}s` }}
                >
                  {ch}
                </span>
              ))}
            </h1>

            <div className="hero-cta">
              <Contact />
              <a href="#réalisations" className="hero-cta-secondary">Voir nos réalisations</a>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="scroll-indicator" aria-hidden="true">
            <span /><span />
          </div>
        </section>

        {/* ══════════════════════════════════════════
            STATS STRIP
        ══════════════════════════════════════════ */}
        <section className="stats-strip" ref={statsRef}>
          <div className="stats-strip-inner">
            <div className="stat-block reveal">
              <span className="stat-num"><CountUp target={15}  suffix="+"  active={statsActive} /></span>
              <span className="stat-label">Années d'expérience</span>
            </div>
            <div className="stat-v-divider" />
            <div className="stat-block reveal reveal-delay-1">
              <span className="stat-num"><CountUp target={500} suffix="+"  active={statsActive} /></span>
              <span className="stat-label">Chantiers réalisés</span>
            </div>
            <div className="stat-v-divider" />
            <div className="stat-block reveal reveal-delay-2">
              <span className="stat-num"><CountUp target={100} suffix="%" active={statsActive} /></span>
              <span className="stat-label">Clients satisfaits</span>
            </div>
            <div className="stat-v-divider" />
            <div className="stat-block reveal reveal-delay-3">
              <span className="stat-num">RGE</span>
              <span className="stat-label">Certification qualité</span>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            NOS SERVICES
        ══════════════════════════════════════════ */}
        <section id="services" className="services-section">
          <div className="section-header-block reveal">
            <span className="section-tag">Ce que nous faisons</span>
            <h2 className="SectionHeader">Nos services</h2>
            <p className="SectionText">
              Vous désirez redonner une nouvelle vie à votre logement ? Profitez
              de notre expérience éprouvée dans diverses branches des travaux de
              bâtiment. Nous réalisons à la demande de nos clients des rénovations
              qui prennent en compte le ravalement de façade, l'isolation
              thermique, l'étanchéité, mais aussi la peinture et la décoration de
              votre intérieur.
            </p>
          </div>

          <div className="services-grid">
            <ServiceCard
              number="01"
              image="/new-ravalement.jpg"
              title="Ravalement"
              description="Notre équipe d'experts se charge du ravalement de votre façade."
              href="/ravalement"
            />
            <ServiceCard
              number="02"
              image="/new-isolation.jpg"
              title="Isolation thermique"
              description="Nous utilisons les meilleurs matériaux pour vos travaux d'isolation."
              href="/isolation"
            />
            <ServiceCard
              number="03"
              image="/new-etancheite.jpg"
              title="Étanchéité"
              description="Nous nous occupons de la parfaite étanchéité de vos balcons et terrasses."
              href="/etancheite"
            />
            <ServiceCard
              number="04"
              image="/new-renovation.jpg"
              title="Travaux de rénovations"
              description="Nous nous occupons des travaux ainsi que la peinture et la décoration d'intérieur."
            />
          </div>
        </section>

        {/* ══════════════════════════════════════════
            QUI SOMMES NOUS
        ══════════════════════════════════════════ */}
        <section className="about-section" id="qui-sommes-nous">

          {/* Image column */}
          <div className="about-image-col">
            <div className="about-image-frame reveal-left">
              <img src="/new-about.jpg" alt="Équipe PMSB sur chantier en région parisienne" />
              <div className="about-badge">
                <span className="about-badge-num">15+</span>
                <span className="about-badge-text">ANS D'EXP.</span>
              </div>
            </div>
          </div>

          {/* Text column */}
          <div className="about-text-col reveal-right">
            <span className="section-tag">À propos de nous</span>
            <h2 className="about-title">Qui sommes nous ?</h2>
            <p className="about-para">
              PMSB, Prestations Multi Services Bâtiment, est une entreprise
              spécialisée dans la réalisation de divers travaux de bâtiment dans
              la région Parisienne. Elle met à votre service ses compétences pour
              l'exécution d'un ravalement de façade, de travaux d'isolation, d'une
              peinture d'intérieur ou encore la rénovation totale de votre
              logement. Comptez sur notre savoir-faire pour obtenir un travail
              soigné.
            </p>
            <div className="about-divider" />
            <Contact />
          </div>
        </section>

        {/* ══════════════════════════════════════════
            NOS RÉALISATIONS
        ══════════════════════════════════════════ */}
        <section id="réalisations" className="realisations-section">
          <span className="section-tag reveal" style={{ justifyContent: "center" }}>
            Ce que nous avons accompli
          </span>
          <h2 className="SectionHeader reveal reveal-delay-1">Nos réalisations</h2>
          <Carousel />
        </section>

        {/* ── Footer / Contact ── */}
        <div className="FooterContainer" id="contact">
          <Footer />
        </div>

      </main>
    </div>
  );
}