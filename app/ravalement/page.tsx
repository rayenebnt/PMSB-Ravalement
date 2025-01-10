"use client";

import React from "react";
import Head from "next/head";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Card2 from "@/components/Card2";
import Rge from "@/components/Rge";
import "../css/Ravalement.css";

export default function RavalementPage() {
  return (
    <div className="page-container">
      <Head>
        <title>PMSB - Ravalement</title>
      </Head>
      <main>
        {/* Navbar fixée */}
        <div className="fixed-navbar">
          <Navbar />
        </div>

        {/* Section de couverture */}
        <section className="full-screen-section">
          <h1 className="main-title">Ravalement</h1>
          <p className="main-text">
            N’exécute pas un ravalement de façade qui veut. C’est une prestation
            qui nécessite la possession de certaines connaissances techniques
            et d’une expérience éprouvée. Nettoyer, décaper, repeindre : aucun
            pan des travaux de ravalement n’échappe à notre savoir-faire.
          </p>
        </section>

        {/* Section expertises */}
        <section className="section">
          <h2 className="section-header">Nos différentes expertises</h2>
          <p className="section-text">
            Nous mettons tout le nécessaire en œuvre pour vous offrir des
            travaux de ravalement de haute qualité.
          </p>
          <div className="services-container">
            <Card2
              imageSrc="/pierre.jpg"
              title="Pierre de taille"
              description="Reconstituer une pierre désagrégée, des décors ou modénatures, faire une retaille de la pierre ou une incrustation nécessite des experts compétents. PMSB est compétente pour la pierre de taille."
            />
            <Card2
              imageSrc="/isolation.png"
              title="Brique"
              description="Le travail de la brique est une spécialité particulière des travaux de ravalement. La rénovation d’une telle façade demande une compétence particulière que dispose notre entreprise."
            />
            <Card2
              imageSrc="/platre.jpg"
              title="Plâtre"
              description="Le travail de plâtrerie en ravalement est particulièrement délicat car il est exposé aux intempéries et à la lumière. Cela demande une équipe spécialisée et formée à ce type d’ouvrage."
            />
            <Card2
              imageSrc="/impermeable.jpg"
              title="Imperméabilisation"
              description="L’imperméabilisation d’une façade est un ouvrage délicat qui requiert des qualifications précises. Nous prenons en charge les 4 niveaux différents d’imperméabilité de façade (I1, I2, I3, I4)."
            />
          </div>
        </section>

        {/* Section RGE */}
        <section className="section">
          <Rge />
        </section>

        {/* Footer */}
        <Footer />
      </main>
    </div>
  );
}
