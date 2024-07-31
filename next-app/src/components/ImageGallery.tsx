import React, { useEffect, useState } from 'react';

const ImageGallery = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetch('/api/images').then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const r = response;
      console.log(r);
      return r.json();
    }).then(data => setImages(data));
  }, [])

  return (
    <div>
      {images.map(image => (
        <div key={image.id}>
          <img src={image.path} alt={image.name} />
        </div>
      ))}
    </div>
  );
};

export default ImageGallery;