"use client";

import React from "react";
import styled from "styled-components";
import Card2 from "@/components/Card2";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Rge from "@/components/Rge";
import Head from "next/head";

const PageContainer = styled.div`
  font-family: Arial, sans-serif;
  color: #333;
  margin: 0;
  padding: 0;
  width: 100%;
  overflow-x: hidden;
`;

const FixedNavbar = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  background-color: rgba(64, 64, 64, 0.9); /* Fond semi-transparent */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Ombre pour effet visuel */
`;

const FullScreenSection = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  background-image: url("/New.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  text-align: center;
`;

const Section = styled.div`
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

export default function RavalementPage() {
  return (
    <PageContainer>
      <Head>
        <title>PMSB - Ravalement</title>
      </Head>
      <main>
        {/* Navbar fixée */}
        <FixedNavbar>
          <Navbar />
        </FixedNavbar>

        {/* Section de couverture */}
        <FullScreenSection>
          <h1
            style={{
              fontSize: "3rem",
              fontWeight: "bold",
              marginBottom: "20px",
            }}
          >
            Ravalement
          </h1>
          <p
            style={{
              maxWidth: "800px",
              fontSize: "1.2rem",
              lineHeight: "1.6",
            }}
          >
            N’exécute pas un ravalement de façade qui veut. C’est une prestation
            qui nécessite la possession de certaines connaissances techniques
            et d’une expérience éprouvée. Nettoyer, décaper, repeindre : aucun
            pan des travaux de ravalement n’échappe à notre savoir-faire.
          </p>
        </FullScreenSection>

        {/* Section expertises */}
        <Section>
          <SectionHeader>Nos différentes expertises</SectionHeader>
          <SectionText>
            Nous mettons tout le nécessaire en œuvre pour vous offrir des
            travaux de ravalement de haute qualité.
          </SectionText>
          <ServicesContainer>
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
          </ServicesContainer>
        </Section>

        {/* Section RGE */}
        <Section>
          <Rge />
        </Section>

        {/* Footer */}
        <Footer />
      </main>
    </PageContainer>
  );
}
