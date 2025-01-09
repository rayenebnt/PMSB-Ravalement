"use client";

import Image from "next/image";
import styled from "styled-components";

// Définition des props avec TypeScript
interface CardProps {
  imageSrc: string;
  title: string;
  description: string;
}

// Styles pour le conteneur principal de la carte
const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  max-width: 300px;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

// Styles pour l'image (nécessaire pour next/image)
const CardImageWrapper = styled.div`
  width: 100%;
  position: relative; /* Requis pour next/image avec layout="fill" */
  aspect-ratio: 1; /* Proportion carrée */
`;

// Contenu de la carte (titre et description)
const CardContent = styled.div`
  padding: 16px;
  text-align: center;
`;

// Titre de la carte
const CardTitle = styled.h2`
  font-size: 20px;
  font-weight: bold;
  margin: 8px 0;
  color: #333333;
`;

// Description de la carte
const CardDescription = styled.p`
  font-size: 16px;
  color: #666666;
`;



// Composant Card
const Card: React.FC<CardProps> = ({ imageSrc, title, description }) => {
  return (
    <CardContainer>
      <CardImageWrapper>
        {/* Gestion des images avec next/image */}
        <Image src={imageSrc} alt={title} layout="fill" objectFit="cover" />
      </CardImageWrapper>
      <CardContent>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardContent>
    </CardContainer>
  );
};

export default Card;
