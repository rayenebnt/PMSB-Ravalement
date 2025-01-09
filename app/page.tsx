"use client";

import Image from "next/image";
import React, { useState } from "react";
import styled from "styled-components";
import Contact from "@/components/Contact";
import Navbar from "@/components/Navbar";
import Card from "@/components/Card";
import Footer from "@/components/Footer";
import Head from "next/head";

const PageContainer = styled.div`
  font-family: Arial, sans-serif;
  color: #333;
  margin: 0;
  padding: 0;
  width: 100%;
  overflow-x: hidden;
`;

const FullScreenSection = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  background-image: url("/bg2.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
`;

const FixedNavbar = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  background-color: rgba(64, 64, 64, 0.9);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Part = styled.div`
  padding: 60px 20px;
  &:nth-child(even) {
    background-color: #404040;
    color: white;
  }
`;

const SectionHeader = styled.h2`
  text-align: center;
  margin-bottom: 20px;
  font-size: 28px;
  color: white;
`;

const SectionText = styled.p`
  text-align: center;
  max-width: 800px;
  margin: 0 auto 40px auto;
  font-size: 18px;
  line-height: 1.6;
  color: white;
`;

const ServicesContainer = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: center;
  padding: 20px;
`;

const CarouselContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  max-width: 800px;
  margin: 0 auto;
  overflow: hidden;
`;

const CarouselWrapper = styled.div<{ $currentSlide: number }>`
  display: flex;
  transition: transform 0.5s ease-in-out;
  transform: ${({ $currentSlide }) => `translateX(-${$currentSlide * 100}%)`};
`;


const Slide = styled.div`
  min-width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 20px;

  img {
    width: 100%;
    height: 300px;
    object-fit: cover;
    border-radius: 10px;
    margin-bottom: 10px;
  }

  p {
    font-size: 16px;
    color: white;
  }
`;

const NavigationButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  cursor: pointer;
  font-size: 20px;
  padding: 10px;
  border-radius: 50%;
  z-index: 1000;

  &:hover {
    background-color: #77b5fe;
  }

  &.prev {
    left: 10px;
  }

  &.next {
    right: 10px;
  }
`;

const FooterContainer = styled(Part)`
  margin-top: 20px;
`;

const Carousel: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      imageUrl: "/qui1.jpg",
      text: "Piochage total et refait en Saint Acier, Paris 75018",
    },
    {
      imageUrl: "/imagebien3.jpg",
      text: "Ravalement Chaux Sable, Paris 75008",
    },
    {
      imageUrl: "/image_real.jpg",
      text: "Travaux de Ravalement et de Zinguerie, Paris 75002",
    },
  ];

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <CarouselContainer>
      <CarouselWrapper $currentSlide={currentSlide}>
        {slides.map((slide, index) => (
          <Slide key={index}>
            <img src={slide.imageUrl} alt={`Slide ${index}`} />
            <p>{slide.text}</p>
          </Slide>
        ))}
      </CarouselWrapper>
      <NavigationButton className="prev" onClick={prevSlide}>
        ❮
      </NavigationButton>
      <NavigationButton className="next" onClick={nextSlide}>
        ❯
      </NavigationButton>
    </CarouselContainer>
  );
};


export default function Home() {
  return (
    <PageContainer>
      <Head>
        <title>PMSB - Entreprise de Ravalement</title>
      </Head>
      <main>
        <FixedNavbar>
          <Navbar />
        </FixedNavbar>

        <FullScreenSection>
        <div
  style={{
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    color: "white",
    textAlign: "center",
  }}
>
  <p
    style={{
      fontSize: "1.5rem", // Taille du texte au-dessus
      marginBottom: "10px", // Espacement entre les deux textes
    }}
  >
    Entreprise de ravalement et de façade
  </p>
  <h1
    style={{
      fontSize: "3rem", // Taille du texte principal
      fontWeight: "bold",
      marginBottom: "10px", // Espacement entre le texte et la ligne
      position: "relative",
    }}
  >
    PMSB
    <span
      style={{
        display: "block",
        width: "50%", // Ajuste la longueur de la ligne
        height: "4px", // Hauteur de la ligne
        backgroundColor: "#77b5fe", // Couleur de la ligne
        margin: "10px auto 0 auto", // Centré sous le texte
      }}
    />
  </h1>
    <Contact />
  </div>
</FullScreenSection>


        <Part id="qui-sommes-nous">
  <SectionHeader>Qui sommes nous ?</SectionHeader>
  <SectionText>
    PMSB, Prestations Multi Services Bâtiment, est une entreprise
    spécialisée dans la réalisation de divers travaux de bâtiment dans
    la région Parisienne. Elle met à votre service ses compétences pour
    l’exécution d’un ravalement de façade, de travaux d’isolation,
    d’une peinture d’intérieur ou encore la rénovation totale de votre
    logement. Comptez sur notre savoir-faire pour obtenir un travail
    soigné.
  </SectionText>
  <div style={{ display: "flex", justifyContent: "center", margin: "20px 0" }}>
    <Contact />
  </div>
  <img
    src="/image_bien.jpg"
    alt="Travaux bien réalisés"
    style={{
      width: "100%",
      height: "400px", // Ajuste la hauteur de l'image
      objectFit: "cover", // Maintient le ratio de l'image
      marginTop: "20px",
      borderRadius: "10px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Effet d'ombre
    }}
  />
</Part>


        <Part id="services">
          <SectionHeader>Nos services</SectionHeader>
          <SectionText>
            Vous désirez redonner une nouvelle vie à votre logement ? Profitez
            de notre expérience éprouvée dans diverses branches des travaux de
            bâtiment. Nous réalisons à la demande de nos clients des
            rénovations qui prennent en compte le ravalement de façade,
            l’isolation thermique, l’étanchéité, mais aussi la peinture et la
            décoration de votre intérieur.
          </SectionText>
          <ServicesContainer>
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
          </ServicesContainer>
        </Part>

        <Part id="réalisations">
          <SectionHeader>Nos réalisations</SectionHeader>
          <Carousel />
        </Part>

        <FooterContainer id="contact">
          <Footer />
        </FooterContainer>
      </main>
    </PageContainer>
  );
}
