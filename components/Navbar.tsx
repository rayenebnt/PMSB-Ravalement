"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import "../app/css/Navbar.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="NavbarContainer">
      <div className="NavbarLogo">
        <a href="/" className="LogoLink">
          <img src="Logo.png" alt="Logo" className="Logo" />
        </a>
      </div>

      <div className={`BurgerMenu ${isOpen ? "open" : ""}`} onClick={toggleMenu}>
        <div></div>
        <div></div>
        <div></div>
      </div>

      <div className={`NavbarLinks ${isOpen ? "show" : ""}`}>
        {isOpen && (
          <a href="/" className="NavbarLink">Accueil</a>
        )}
        {isHome && (
          <a href="#qui-sommes-nous" className="NavbarLink">Qui sommes-nous ?</a>
        )}
        {isHome && (
          <a href="#contact" className="NavbarLink">Contact</a>
        )}
        <a href="/ravalement" className="NavbarLink">Ravalement</a>
        <a href="/isolation" className="NavbarLink">Isolation</a>
        <a href="/etancheite" className="NavbarLink">Étanchéité</a>
        {isHome && (
          <a href="#services" className="NavbarLink">Services</a>
        )}
        {isHome && (
          <a href="#réalisations" className="NavbarLink">Réalisations</a>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
