"use client";

import React from "react";
import "../app/css/Footer.css";

const Footer: React.FC = () => {
  return (
    <footer className="footer">

      {/* ── Top accent bar ── */}
      <div className="footer-top-bar">
        <span className="footer-top-brand">PMSB</span>
        <div className="footer-top-line" />
      </div>

      {/* ── Main grid ── */}
      <div className="footer-grid">

        {/* Brand + social */}
        <div className="footer-col footer-col-brand">
          <img src="Logo.png" alt="Logo PMSB" className="footer-logo" />
          <a
            href="https://www.linkedin.com/in/sarl-pmsb-740726280/"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-social-link"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
              <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14zm-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79zM6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68zm1.39 9.94v-8.37H5.5v8.37h2.77z"/>
            </svg>
            Suivez-nous
          </a>
        </div>

        {/* Navigation */}
        <div className="footer-col">
          <h3 className="footer-col-title">Navigation</h3>
          <nav className="footer-nav">
            <a href="/">Accueil</a>
            <a href="/ravalement">Ravalement</a>
            <a href="/isolation">Isolation</a>
            <a href="/etancheite">Étanchéité</a>
          </nav>
        </div>

        {/* Contact */}
        <div className="footer-col">
          <h3 className="footer-col-title">Contact</h3>
          <ul className="footer-contact-list">
            <li>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="15" height="15">
                <path d="M6.62 10.79a15.051 15.051 0 006.59 6.59l2.2-2.2a1 1 0 011.1-.23c1.18.47 2.47.73 3.79.73a1 1 0 011 1v3.19a1 1 0 01-1 1C10.61 21 3 13.39 3 4.5a1 1 0 011-1h3.19a1 1 0 011 1c0 1.32.25 2.61.73 3.79a1 1 0 01-.23 1.1l-2.2 2.2z"/>
              </svg>
              <span>06 13 40 19 01</span>
            </li>
            <li>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="15" height="15">
                <path d="M12 13.5L2 7.5V18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V7.5l-10 6zM12 11L22 5H2l10 6z"/>
              </svg>
              <span>pmsb.pmsb@yahoo.fr</span>
            </li>
            <li>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="15" height="15">
                <path d="M12 2C8.14 2 5 5.14 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.86-3.14-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
              <span>94380 Bonneuil-Sur-Marne</span>
            </li>
          </ul>
        </div>

        {/* Qualification */}
        <div className="footer-col footer-col-qual">
          <h3 className="footer-col-title">Qualification</h3>
          <div className="footer-badges">
            <img src="label.png"            alt="Label qualité" />
            <img src="certification-rge.png" alt="Certification RGE" />
          </div>
        </div>

      </div>

      {/* ── Bottom bar ── */}
      <div className="footer-bottom">
        <span>© Copyright 2023 PMSB</span>
      </div>

    </footer>
  );
};

export default Footer;
