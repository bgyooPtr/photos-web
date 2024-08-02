import { ExifDateTime } from 'exiftool-vendored';
import React, { useEffect, useState } from 'react';

interface Metadata {
  model?: string;
  lensModel?: string;
  fNumber?: number;
  exposureTime?: string;
  iso?: number;
  createDate?: string | ExifDateTime;
  latitude?: number;
  longitude?: number;
  exposureCompensation?: number;
}

const ImageGallery = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetch('/api/images')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const r = response;
        console.log(r);
        return r.json();
      })
      .then((data) => setImages(data));
  }, []);

  return (
    <div>
      {images.map((image) => (
        <div key={image.id}>
          <img src={image.path} alt={image.name} />
          <div className="image-overlay"></div>
          <div className="metadata-overlay">
            <p>Model: {image.metadata.model}</p>
            <p>Lens Model: {image.metadata.lensModel}</p>
            <p>fNumber: {image.metadata.fNumber}</p>
            <p>Exposure Time: {image.metadata.exposureTime}</p>
            <p>ISO: {image.metadata.iso}</p>
            <p>Create Date: {image.metadata.createDate}</p>
            <p>Latitude: {image.metadata.latitude}</p>
            <p>Longitude: {image.metadata.longitude}</p>
            <p>Exposure Compensation: {image.metadata.exposureCompensation}</p>
          </div>
          <img src={image.path} alt={image.name} />
        </div>
      ))}
    </div>
  );
};

export default ImageGallery;
