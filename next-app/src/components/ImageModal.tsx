import React from 'react';
import styles from '../styles/Home.module.css';
import { Image } from '../models/Image';

interface ImageModalProps {
  image: Image;
  onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ image, onClose }) => {
  const metadata = image.metadata;

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <span className={styles.close} onClick={onClose}>
          &times;
        </span>
        <img src={image.path} alt="large view" className={styles.fullImage} />
        <div className={metadata.ImageWidth > metadata.ImageHeight ? styles.metadataBottom : styles.metadataSide}>
          <p>Model: {metadata.Model}</p>
          <p>Lens Model: {metadata.LensModel}</p>
          <p>fNumber: {metadata.FNumber}</p>
          <p>Exposure Time: {metadata.ExposureTime}</p>
          <p>ISO: {metadata.ISO}</p>
          <p>Created At: {metadata.CreateDate?.year}</p>
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
