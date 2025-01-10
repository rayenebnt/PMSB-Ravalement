"use client";

import Image from "next/image";
import styled from "styled-components";

interface CardProps {
  imageSrc: string;
  title: string;
  description: string;
}

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

const CardImageWrapper = styled.div`
  width: 100%;
  height: 200px;
  position: relative; /* Requis pour next/image */
`;

const CardContent = styled.div`
  padding: 16px;
  text-align: center;
`;

const CardTitle = styled.h2`
  font-size: 20px;
  font-weight: bold;
  margin: 8px 0;
  color: #333333;
`;

const CardDescription = styled.p`
  font-size: 16px;
  color: #666666;
`;

const Card: React.FC<CardProps> = ({ imageSrc, title, description }) => {
  return (
    <CardContainer>
      <CardImageWrapper>
        <Image
          src={imageSrc}
          alt={title}
          fill
          style={{ objectFit: "cover" }}
          sizes="(max-width: 768px) 100vw, 300px"
        />
      </CardImageWrapper>
      <CardContent>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardContent>
    </CardContainer>
  );
};

export default Card;
