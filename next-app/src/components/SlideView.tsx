import React from 'react';
import styles from '../styles/Home.module.css';
import { Image } from '../models/Image';

interface SlideViewProps {
  images: Image[];
  onSelectImage: (src: Image) => void;
}

const SlideView: React.FC<SlideViewProps> = ({ images, onSelectImage }) => (
  <div className={styles.slideView}>
    {images.map((image, index) => (
      <div key={index} className={styles.slide} onClick={() => onSelectImage(image)}>
        <img src={image.path} alt={image.name} />
      </div>
    ))}
  </div>
);

export default SlideView;
