import Image from "next/image";
import "../app/css/Card3.css";

interface CardProps {
  imageSrc: string;
  title: string;
  description: string;
}

const Card3: React.FC<CardProps> = ({ imageSrc, title, description }) => {
  return (
    <div className="card3">
      <div className="card-image3">
        <Image src={imageSrc} alt={title} width={200} height={330} />
      </div>
      <div className="card-content3">
        <h2 className="card-title3">{title}</h2>
        <p className="card-description3">{description}</p>
      </div>
    </div>
  );
};

export default Card3;
