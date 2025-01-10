"use client";

import Image from "next/image";
import React from "react";
import "../app/css/Card.css";

interface CardProps {
  imageSrc: string;
  title: string;
  description: string;
}

const Card: React.FC<CardProps> = ({ imageSrc, title, description }) => {
  return (
    <div className="CardContainer">
      <div className="CardImageWrapper">
        <Image
          src={imageSrc}
          alt={title}
          fill
          style={{ objectFit: "cover" }}
          sizes="(max-width: 768px) 100vw, 300px"
        />
      </div>
      <div className="CardContent">
        <h2 className="CardTitle">{title}</h2>
        <p className="CardDescription">{description}</p>
      </div>
    </div>
  );
};

export default Card;
