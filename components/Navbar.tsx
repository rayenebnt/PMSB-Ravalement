"use client";

import React, { useState } from "react";
import "../app/css/Navbar.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="NavbarContainer">
      {/* Section gauche */}
      <div className="NavbarLeft">
        <a href="/">
          <img src="Logo.png" alt="Logo" className="Logo" />
        </a>
        <a href="#qui-sommes-nous" className="NavbarLink">
          Qui sommes nous ?
        </a>
        <a href="#contact" className="NavbarLink">
          Contact
        </a>
      </div>

      {/* Menu burger */}
      <div
        className={`BurgerMenu ${isOpen ? "open" : ""}`}
        onClick={toggleMenu}
      >
        <div></div>
        <div></div>
        <div></div>
      </div>

      {/* Liens de navigation */}
      <div className={`NavbarLinks ${isOpen ? "show" : ""}`}>
        <a href="/ravalement" className="NavbarLink">
          Ravalement
        </a>
        <a href="/isolation" className="NavbarLink">
          Isolation
        </a>
        <a href="/etancheite" className="NavbarLink">
          Étanchéité
        </a>
        <a href="#services" className="NavbarLink">
          Services
        </a>
        <a href="#réalisations" className="NavbarLink">
          Réalisations
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
