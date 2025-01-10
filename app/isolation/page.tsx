"use client";

import React from "react";
import Head from "next/head";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Card3 from "@/components/Card3";
import Isol from "@/components/Isol";
import "../css/Isolation.css";
import Card2 from "@/components/Card2";

export default function IsolationPage() {
  return (
    <div className="page-container">
      <Head>
        <title>PMSB - Isolation Thermique</title>
      </Head>
      <main>
        {/* Navbar fixée */}
        <div className="fixed-navbar">
          <Navbar />
        </div>

        {/* Section de couverture */}
        <section className="full-screen-section">
          <h1 className="main-title">Isolation Thermique</h1>
          <p className="main-text">
            Une maison bien isolée accroît son niveau de confort. En outre, cela
            permet de réaliser des économies d’énergie importantes.
            <br />
            <br />
            On avance des réductions qui tournent autour de 30 %. Vous avez donc
            pleinement raison de vous soucier de l’isolation de votre logement.
            <br />
            <br />
            Pour identifier le meilleur matériau, la technique adaptée à votre
            habitation, fiez-vous au professionnalisme de PMSB. Nous nous
            appliquerons à mettre en œuvre vos souhaits et à renforcer les
            performances énergétiques de votre bien.
          </p>
        </section>

        {/* Section matériaux */}
        <section className="section">
          <h2 className="section-header">Nos différents matériaux</h2>
          <p className="section-text">
            Notre équipe d'experts met tout en œuvre pour vous garantir une
            isolation thermique de haute qualité.
          </p>
          <div className="services-container">
            <Card2
              imageSrc="/laine.jpg"
              title="Laine de roche"
              description="La laine de roche est essentiellement composée de matière minérale comme le basalte. On peut donc la qualifier de matériau écologique, d’autant que son bilan carbone devient positif très peu de temps après sa mise en œuvre comme isolant."
            />
            <Card2
              imageSrc="/isolation.png"
              title="Le polystyrène"
              description="Le polystyrene est un produit qui a de multiples avantages pour isoler vos murs et éviter ainsi les déperditions énergétiques tout en apportant un confort thermique. Économique et performant, c’est le matériau incontournable pour vos travaux !"
            />
            <Card2
              imageSrc="/graphité.jpg"
              title="Le graphité"
              description="Le graphité permet de lutter contre les ponts thermiques et les moisissures dans les intérieurs à condition que la ventilation intérieure soit correctement réglée. De plus, ce matériau permet une meilleure isolation acoustique."
            />
            <Card2
              imageSrc="/Rénovation.png"
              title="Des matériaux de haute qualité"
              description="Chez PMSB, la qualité est au centre de notre travail. Isoler les murs de son immeuble permet de limiter les déperditions d’énergie, d’améliorer le confort thermique et d’avoir une meilleure isolation acoustique."
            />
          </div>
        </section>

        {/* Section pourquoi isoler */}
        <section className="section">
          <h2 className="section-header">
            Pourquoi isoler ses murs par l'extérieur ?
          </h2>
          <Isol />
        </section>

        {/* Footer */}
        <Footer />
      </main>
    </div>
  );
}
