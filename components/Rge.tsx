"use client";

import React from "react";
import Image from "next/image";
import "../app/css/Rge.css";

const Rge: React.FC = () => {
  return (
    <div className="RgeSection">
      <div className="RgeCard">
        {/* Texte */}
        <div className="RgeText">
          <span className="RgeBadge">Certification officielle</span>
          <h2 className="RgeTitle">Entreprise certifiée RGE</h2>
          <p className="RgeDesc">
            Notre entreprise est certifiée <strong>RGE — Reconnu Garant de
            l'Environnement</strong>, mention de qualité délivrée aux
            professionnels du bâtiment dans le domaine de l'efficacité
            énergétique et des énergies renouvelables.
          </p>
          <ul className="RgeList">
            <li>Gage de crédibilité pour vos travaux de performance énergétique</li>
            <li>Accès aux aides financières de la transition énergétique</li>
            <li>Expertise reconnue par l'État en rénovation énergétique</li>
          </ul>
        </div>

        {/* Logo */}
        <div className="RgeLogoWrapper">
          <div className="RgeLogoFrame">
            <Image
              src="/certification-rge.png"
              alt="Certification RGE"
              width={300}
              height={154}
              style={{ objectFit: "contain", width: "100%", height: "auto" }}
              quality={90}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rge;
