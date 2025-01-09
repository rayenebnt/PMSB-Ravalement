"use client";

import React from "react";
import styled from "styled-components";

const FooterContainer = styled.footer`
  background-color: #404040;
  color: white;
  padding: 40px 20px;
`;

const FooterWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;
  gap: 20px;
  border-bottom: 1px solid #77b5fe;
  padding-bottom: 20px;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const FooterSection = styled.div`
  flex: 1;
  text-align: center;
  min-width: 250px;

  h2 {
    font-size: 18px;
    margin-bottom: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    color: #77b5fe;
    font-weight: bold;
  }

  a {
    display: block;
    font-size: 14px;
    margin: 5px 0;
    color: white;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
      color: #77b5fe; /* Change la couleur au survol */
    }
  }

  img {
    margin-top: 10px;
    width: 80px;
    height: auto;
    border-radius: 10px;
  }
`;


const Divider = styled.div`
  border-left: 1px solid #77b5fe;
  height: 100%;
  margin: 0 20px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const FooterBottom = styled.div`
  text-align: center;
  font-size: 12px;
  color: #77b5fe;
`;

const Footer: React.FC = () => {
  return (
    <FooterContainer>
      {/* Partie principale */}
      <FooterWrapper>
        {/* Section Adresse */}
        {/* Section Adresse */}
<FooterSection>
  <h2>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="#77b5fe"
    >
      <path d="M12 2C8.14 2 5 5.14 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.86-3.14-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
    </svg>
    Adresse
  </h2>
  <p>94380 Bonneuil-Sur-Marne</p>
</FooterSection>

<Divider />

{/* Section Téléphone */}
<FooterSection>
  <h2>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="#77b5fe"
    >
      <path d="M6.62 10.79a15.051 15.051 0 006.59 6.59l2.2-2.2a1 1 0 011.1-.23c1.18.47 2.47.73 3.79.73a1 1 0 011 1v3.19a1 1 0 01-1 1C10.61 21 3 13.39 3 4.5a1 1 0 011-1h3.19a1 1 0 011 1c0 1.32.25 2.61.73 3.79a1 1 0 01-.23 1.1l-2.2 2.2z" />
    </svg>
    Téléphone
  </h2>
  <p>06 13 40 19 01</p>
</FooterSection>

        <Divider />

        {/* Section Email */}
        <FooterSection>
  <h2>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="#77b5fe"
    >
      <path d="M12 13.5L2 7.5V18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V7.5l-10 6zM12 11L22 5H2l10 6z" />
    </svg>
    E-mail
  </h2>
  <p>pmsb.pmsb@yahoo.fr</p>
</FooterSection>

      </FooterWrapper>

      {/* Bas du footer */}
      <FooterWrapper>
        {/* Logo */}
        <FooterSection>
          <img src="Logo.png" alt="Logo PMSB" />
        </FooterSection>

        <Divider />

        {/* Navigation */}
        <FooterSection>
  <h2>Navigation</h2>
  <a href="/home">Accueil</a>
  <a href="/ravalement">Ravalement</a>
  <a href="/isolation">Isolation</a>
  <a href="/etancheite">Étanchéité</a>
</FooterSection>

        <Divider />

        {/* Certification */}
        <FooterSection>
          <h2>Qualification</h2>
          <img src="label.png" alt="Certification" />
        </FooterSection>

        <Divider />

        {/* Réseaux sociaux */}
        <FooterSection>
          <h2>Suivez-nous</h2>
          <p>
          <a href="https://www.linkedin.com/in/sarl-pmsb-740726280/" target="_blank" rel="noopener noreferrer">
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAByElEQVR4nO2ZP0/CQBjG22scXI2Tiauy+glc3MC4+iX8DA6G9IiDJsYBBhdNHJwcNRGIHY3xjoBCgkTEAUP8A63yt7ymBVQEIq2mvSb3JM/UN5fnd+97N1wFgYuLi4tpSTJdQTKJI5lqCFNwxDLVRExjkkyW/xRexAQ7FhoPt4hJ0P7OuxwedS2FSMAygDk2DIRHRhdkGrUOgInqdnDUs0wqNgAYCI6//G8AvkgazgsaaA0dlIIG8+G0twCUggbfFb/XvAWgNfQ+ALWuewtA8XoHfJG0CWF0IpZXYS584y0A5JIFDoA7OzFM43yf3b2G7YsSpEpVqDbb8FprmaO4dvoAk5sJtgEW9jLw+NaEUbosvsPMTopdgOxLHX5TLK+CxCrAuPIf5dgE0Ntgzv/S4S2sHucheqcOrdtPPrMJsK4U+2omQgk4yVUG6jJPNTYBpreTA+ssHmQH6sq1FnsA7R/fe57aSo5d63oH7K6FOADmHTDFRwjzQ0z5LYT4NWpRo24Otyx4+mkR07JlAON9noHgYFjE9MwygPFzwe3gqGsJX/ktA3S6QIJuhxcx2bAV/rMTIRIw3uedPRNENcbG9s5zcXFxCU7pA5Jwntel+S2tAAAAAElFTkSuQmCC"
              alt="LinkedIn"></img>
            </a>
          </p>
        </FooterSection>
      </FooterWrapper>

      <FooterBottom>© Copyright 2023 PMSB</FooterBottom>
    </FooterContainer>
  );
};

export default Footer;
