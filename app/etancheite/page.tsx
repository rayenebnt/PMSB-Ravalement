import React from "react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Head from "next/head";
import "../css/Etancheite.css"
import Card2 from "@/components/Card2";

export default function EtancheitePage() {
  return (
    <div className="page-container">
      <Head>
        <title>PMSB - Étanchéité</title>
      </Head>
      <main>
      <div className="fixed-navbar">
          <Navbar />
        </div>
        {/* Section d'introduction */}
        <section className="full-screen-section">
          <h1 className="main-title">Étanchéité</h1>
          <p className="main-text">
            Notre équipe d'experts chez PMSB s'engage à vous offrir des solutions durables
            pour la rénovation de vos terrasses et balcons, en empêchant toute infiltration
            d'eau nuisible.
          </p>
          <p className="main-text hero-extra">
            Que votre complexe d'étanchéité soit devenu obsolète ou endommagé, nous avons
            l'expertise pour mettre en œuvre des systèmes modernes garantissant une
            étanchéité optimale. Votre tranquillité d'esprit est notre priorité.
          </p>
        </section>

        {/* Types d'étanchéité */}
        <section className="section">
          <h2 className="section-header">Nos types d'étanchéité</h2>
          <div className="services-container">
            <Card2
              imageSrc="/balcon2.jpg"
              title="Balcon"
              description="L'étanchéité des balcons est essentielle pour empêcher les infiltrations d'eau, protéger la structure, et garantir la durabilité du balcon."
            />
            <Card2
              imageSrc="/cave2.jpg"
              title="Cave"
              description="L'étanchéité des caves est cruciale pour éviter les infiltrations d'eau, protéger les fondations, et préserver l'intégrité structurelle de la cave."
            />
            <Card2
              imageSrc="/parking2.jpg"
              title="Parking"
              description="L'étanchéité des parkings est vitale pour empêcher les infiltrations d'eau, préserver l'intégrité structurelle du parking, et assurer sa durabilité."
            />
          </div>
        </section>

        {/* Produits utilisés */}
        <section className="section alternate-section">
          <h2 className="section-header">Les produits utilisés</h2>
          <div className="services-container">
            <Card2
              imageSrc="/primaire.jpg"
              title="Produit primaire d'accrochage"
              description="Le produit primaire d'accrochage assure une adhérence solide entre la surface préparée et les revêtements ultérieurs, améliorant la durabilité et prévenant les décollements prématurés des revêtements d'étanchéité."
            />
            <Card2
              imageSrc="/Stocorr.jpg"
              title="Peinture résine"
              description="La peinture résine, faite de résines synthétiques, offre une protection robuste contre les intempéries, les UV, les produits chimiques et l'abrasion, tout en préservant l'esthétique."
            />
            <Card2
              imageSrc="/laque.jpg"
              title="Laque de finition"
              description="La laque de finition est un revêtement lisse et brillant composé de résines, offrant une protection durable et améliorant l'esthétique de surfaces telles que le bois, le métal, et les meubles."
            />
          </div>
        </section>

        {/* Footer */}
        <Footer />
      </main>
    </div>
  );
}
