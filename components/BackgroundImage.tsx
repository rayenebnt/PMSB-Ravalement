import Image from 'next/image';

interface BackgroundImageProps {
  imageUrl: string;
  text: string;
}

const BackgroundImage = ({ imageUrl, text }: BackgroundImageProps) => {
  return (
    <div className="background-image1" style={{backgroundImage: `url(${imageUrl})`}}>
      <p>{text}</p>
    </div>
  );
};

export default BackgroundImage;