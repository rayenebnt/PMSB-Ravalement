"use client";

import React from "react";
import "../app/css/Rge.css";

const Rge: React.FC = () => {
  return (
    <div className="RgeContainer">
      {/* Texte */}
      <div className="TextBlock">
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
      </div>

      {/* Image */}
      <img
        className="StyledImage"
        src="/certification-rge.png"
        alt="Certifié RGE"
      />
    </div>
  );
};

export default Rge;
