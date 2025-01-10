"use client";

import React from "react";
import styled from "styled-components";

// Conteneur principal de la section
const RgeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 40px 20px;
  background-color: #404040;
  color: white;
  text-align: center;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: center;
    text-align: left;
  }
`;

// Bloc de texte
const TextBlock = styled.div`
  flex: 1;
  max-width: 600px;

  h2 {
    font-size: 24px;
    margin-bottom: 20px;
    color: #77b5fe;
  }

  p {
    font-size: 16px;
    line-height: 1.6;
    color: white;
  }
`;

// Image stylisée
const StyledImage = styled.img`
  width: 100%;
  max-width: 300px;
  height: auto;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);

  @media (min-width: 768px) {
    max-width: 400px;
  }
`;

// Composant Rge
const Rge: React.FC = () => {
  return (
    <RgeContainer>
      {/* Texte */}
      <TextBlock>
        <h2>ENTREPRISE CERTIFIÉE RGE</h2>
        <p>
          Notre entreprise est certifiée RGE (Reconnu Garant de
          l’Environnement). <br />
          <br />
          Cela est une mention de qualité des professionnels du secteur du
          bâtiment dans le domaine de l’efficacité énergétique et des énergies
          renouvelables. Cette mention est un gage de crédibilité pour le
          particulier voulant réaliser des travaux de performance énergétique
          dans son logement. Et lui permet d’accéder à des aides financières au
          titre de la transition énergétique.
        </p>
      </TextBlock>

      {/* Image */}
      <StyledImage
        src="/certification-rge.png"
        alt="Certifié RGE"
      />
    </RgeContainer>
  );
};

export default Rge;
