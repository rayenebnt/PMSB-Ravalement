import Image from 'next/image';

interface CardProps {
  imageSrc: string;
  title: string;
  description: string;
}

const Card5: React.FC<CardProps> = ({ imageSrc, title, description }) => {
  return (
    <div className="card5">
      <div className="card-image5">
        <Image src={imageSrc} alt={title} width={310} height={200} />
      </div>
      <div className="card-content5">
        <h2 className="card-title5">{title}</h2>
        <p className="card-description5">{description}</p>
      </div>
    </div>
  );
};

export default Card5;