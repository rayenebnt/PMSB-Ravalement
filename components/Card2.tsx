import Image from 'next/image';

interface CardProps {
  imageSrc: string;
  title: string;
  description: string;
}

const Card2: React.FC<CardProps> = ({ imageSrc, title, description }) => {
  return (
    <div className="card2">
      <div className="card-image2">
        <Image src={imageSrc} alt={title} width={200} height={300} />
      </div>
      <div className="card-content2">
        <h2 className="card-title2">{title}</h2>
        <p className="card-description2">{description}</p>
      </div>
    </div>
  );
};

export default Card2;