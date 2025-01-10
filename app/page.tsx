"use client";

import React, { useState } from "react";
import Contact from "@/components/Contact";
import Navbar from "@/components/Navbar";
import Card from "@/components/Card";
import Footer from "@/components/Footer";
import Head from "next/head";
import "./Home.css";

const Carousel: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      imageUrl: "/qui1.jpg",
      text: "Piochage total et refait en Saint Acier, Paris 75018",
    },
    {
      imageUrl: "/imagebien3.JPG",
      text: "Ravalement Chaux Sable, Paris 75008",
    },
    {
      imageUrl: "/image_real.JPG",
      text: "Travaux de Ravalement et de Zinguerie, Paris 75002",
    },
  ];

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="CarouselContainer">
      <div
        className="CarouselWrapper"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div className="Slide" key={index}>
            <img src={slide.imageUrl} alt={`Slide ${index}`} />
            <p>{slide.text}</p>
          </div>
        ))}
      </div>
      <button className="NavigationButton prev" onClick={prevSlide}>
        ❮
      </button>
      <button className="NavigationButton next" onClick={nextSlide}>
        ❯
      </button>
    </div>
  );
};

export default function Home() {
  return (
    <div id="PageContainer">
      <Head>
        <title>PMSB - Entreprise de Ravalement</title>
      </Head>
      <main>
        {/* Navbar */}
        <div id="FixedNavbar">
          <Navbar />
        </div>

        {/* Full Screen Section */}
        <div id="FullScreenSection">
          <div>
            <p>Entreprise de ravalement et de façade</p>
            <h1>
              PMSB
              <span />
            </h1>
            <Contact />
          </div>
        </div>

        {/* Qui sommes nous */}
        <div className="Part" id="qui-sommes-nous">
          <h2 className="SectionHeader">Qui sommes nous ?</h2>
          <p className="SectionText">
            PMSB, Prestations Multi Services Bâtiment, est une entreprise
            spécialisée dans la réalisation de divers travaux de bâtiment dans
            la région Parisienne. Elle met à votre service ses compétences pour
            l’exécution d’un ravalement de façade, de travaux d’isolation, d’une
            peinture d’intérieur ou encore la rénovation totale de votre
            logement. Comptez sur notre savoir-faire pour obtenir un travail
            soigné.
          </p>
          <div style={{ display: "flex", justifyContent: "center", margin: "20px 0" }}>
            <Contact />
          </div>
          <img
            src="/image_bien.JPG"
            alt="Travaux bien réalisés"
            style={{
              width: "100%",
              height: "400px",
              objectFit: "cover",
              marginTop: "20px",
              borderRadius: "10px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            }}
          />
        </div>

        {/* Nos services */}
        <div className="Part" id="services">
          <h2 className="SectionHeader">Nos services</h2>
          <p className="SectionText">
            Vous désirez redonner une nouvelle vie à votre logement ? Profitez
            de notre expérience éprouvée dans diverses branches des travaux de
            bâtiment. Nous réalisons à la demande de nos clients des
            rénovations qui prennent en compte le ravalement de façade,
            l’isolation thermique, l’étanchéité, mais aussi la peinture et la
            décoration de votre intérieur.
          </p>
          <div className="ServicesContainer">
            <Card
              imageSrc="/ravalement2.jpg"
              title="Ravalement"
              description="Notre équipe d'experts se charge du ravalement de votre façade."
            />
            <Card
              imageSrc="/isolation.png"
              title="Isolation thermique"
              description="Nous utilisons les meilleurs matériaux pour vos travaux d'isolation."
            />
            <Card
              imageSrc="/Etancheité.png"
              title="Étanchéité"
              description="Nous nous occupons de la parfaite étanchéité de vos balcons et vos terrasses."
            />
            <Card
              imageSrc="/Rénovation.png"
              title="Travaux de rénovations"
              description="Nous nous occupons des travaux ainsi que la peinture et la décoration d'intérieur."
            />
          </div>
        </div>

        {/* Nos réalisations */}
        <div className="Part" id="réalisations">
          <h2 className="SectionHeader">Nos réalisations</h2>
          <Carousel />
        </div>

        {/* Footer */}
        <div className="FooterContainer" id="contact">
          <Footer />
        </div>
      </main>
    </div>
  );
}
