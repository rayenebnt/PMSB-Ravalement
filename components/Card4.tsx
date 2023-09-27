import Image from 'next/image';

interface CardProps {
  imageSrc: string;
  title: string;
  description: string;
}

const Card4: React.FC<CardProps> = ({ imageSrc, title, description }) => {
  return (
    <div className="card4">
      <div className="card-image4">
        <Image src={imageSrc} alt={title} width={310} height={200} />
      </div>
      <div className="card-content4">
        <h2 className="card-title4">{title}</h2>
        <p className="card-description4">{description}</p>
      </div>
    </div>
  );
};

export default Card4;