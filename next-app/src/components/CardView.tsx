import React from 'react';
import styles from '../styles/Home.module.css';
import { Image } from '../models/Image';

interface CardViewProps {
  images: Image[];
  onSelectImage: (image: Image) => void;
}

const CardView: React.FC<CardViewProps> = ({ images, onSelectImage }) => (
  <div className={styles.cardView}>
    {images.map((image, index) => (
      <div key={index} className={styles.card} onClick={() => onSelectImage(image)}>
        <img src={image.path} alt={image.name} />
      </div>
    ))}
  </div>
);

export default CardView;
