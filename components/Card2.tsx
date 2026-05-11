"use client";

import Image from "next/image";
import "../app/css/Card2.css";

interface CardProps {
  imageSrc: string;
  title: string;
  description: string;
}

const Card2: React.FC<CardProps> = ({ imageSrc, title, description }) => {
  return (
    <div className="CardContainer">
      <div className="CardImageWrapper">
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="StyledImage"
          sizes="(max-width: 768px) calc(100vw - 48px), 300px"
          quality={90}
        />
      </div>
      <div className="CardContent">
        <h2 className="CardTitle">{title}</h2>
        <p className="CardDescription">{description}</p>
      </div>
    </div>
  );
};

export default Card2;
