"use client";

import React, { useState } from "react";
import styled from "styled-components";

// Conteneur principal de la Navbar
const NavbarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 40px;
  background-color: #404040;
  color: white;
  height: 80px;
  position: sticky;
  top: 0;
  z-index: 1000;

  @media (max-width: 1024px) {
    padding: 10px 20px;
  }
`;

// Section gauche de la Navbar
const NavbarLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
`;

// Logo stylisé
const Logo = styled.img`
  height: 60px;
  width: auto;
`;

// Menu burger (3 lignes)
const BurgerMenu = styled.div`
  display: none;

  @media (max-width: 1024px) {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 30px;
    height: 25px;
    cursor: pointer;
  }

  div {
    background-color: white;
    height: 3px;
    border-radius: 5px;
    transition: all 0.3s ease;
  }

  /* Animation pour le menu ouvert */
  &.open div:nth-child(1) {
    transform: rotate(45deg) translate(5px, 5px);
  }
  &.open div:nth-child(2) {
    opacity: 0;
  }
  &.open div:nth-child(3) {
    transform: rotate(-45deg) translate(5px, -5px);
  }
`;

// Liens de navigation (avec transient prop)
const NavbarLinks = styled.div<{ $isOpen: boolean }>`
  display: flex;
  align-items: center;
  gap: 30px;

  @media (max-width: 1024px) {
    display: ${(props) => (props.$isOpen ? "flex" : "none")};
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    background-color: #404040;
    position: absolute;
    top: 80px;
    left: 0;
    padding: 20px;
    z-index: 999;
  }
`;

// Style des liens individuels
const NavbarLink = styled.a`
  text-decoration: none;
  color: white;
  font-size: 16px;
  transition: color 0.3s ease;

  &:hover {
    color: #77b5fe;
  }
`;

// Composant Navbar
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <NavbarContainer>
      {/* Section gauche */}
      <NavbarLeft>
  <a href="/">
    <Logo src="Logo.png" alt="Logo" />
  </a>
  <NavbarLink href="#qui-sommes-nous">Qui sommes nous ?</NavbarLink>
  <NavbarLink href="#contact">Contact</NavbarLink>
</NavbarLeft>

      {/* Menu burger */}
      <BurgerMenu onClick={toggleMenu} className={isOpen ? "open" : ""}>
        <div></div>
        <div></div>
        <div></div>
      </BurgerMenu>

      {/* Liens de navigation */}
      <NavbarLinks $isOpen={isOpen}>
  <NavbarLink href="/ravalement">Ravalement</NavbarLink>
  <NavbarLink href="/isolation">Isolation</NavbarLink>
  <NavbarLink href="/etancheite">Étanchéité</NavbarLink>
  <NavbarLink href="#services">Services</NavbarLink>
  <NavbarLink href="#réalisations">Réalisations</NavbarLink>
    </NavbarLinks>
    </NavbarContainer>
  );
};

export default Navbar;

