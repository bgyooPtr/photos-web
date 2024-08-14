import React from 'react';
import { Image } from '../models/Image';
import styles from '../styles/CardView.module.css';

interface CardViewProps {
  images: Image[];
  onSelectImage: (image: Image) => void;
}

const CardView: React.FC<CardViewProps> = ({ images, onSelectImage }) => {
  return (
    <div className={styles.gallery}>
      {images.map((image, index) => (
        <div className={styles['gallery-item']}>
          <img
            className={styles['gallery-image']}
            key={index}
            src={image.path}
            alt={image.name}
            onClick={() => onSelectImage(image)}
          />
        </div>
      ))}
    </div>
  );
};

export default CardView;
