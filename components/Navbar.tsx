"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation"; // Détecter la page actuelle
import "../app/css/Navbar.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname(); // Obtenir l'URL actuelle

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Vérifier si on est sur la page Home
  const isHomePage = pathname === "/";

  return (
    <nav className="NavbarContainer">
      {/* Logo toujours visible */}
      <div className="NavbarLogo">
        <a href="/" className="LogoLink">
          <img src="Logo.png" alt="Logo" className="Logo" />
        </a>
      </div>

      {/* Menu burger toujours visible en mobile */}
      <div className="BurgerMenu" onClick={toggleMenu}>
        <div className={isOpen ? "open" : ""}></div>
        <div className={isOpen ? "open" : ""}></div>
        <div className={isOpen ? "open" : ""}></div>
      </div>

      {/* Liens de navigation */}
      <div className={`NavbarLinks ${isOpen ? "show" : ""}`}>
        <a href="/" className="NavbarLink">Accueil</a>
        
        {/* Liens visibles uniquement sur la page Home */}
        {isHomePage && (
          <>
            <a href="#qui-sommes-nous" className="NavbarLink">Qui sommes-nous ?</a>
            <a href="#services" className="NavbarLink">Services</a>
            <a href="#réalisations" className="NavbarLink">Réalisations</a>
            <a href="#contact" className="NavbarLink">Contact</a>
          </>
        )}

        <a href="/ravalement" className="NavbarLink">Ravalement</a>
        <a href="/isolation" className="NavbarLink">Isolation</a>
        <a href="/etancheite" className="NavbarLink">Étanchéité</a>
      </div>
    </nav>
  );
};

export default Navbar;
