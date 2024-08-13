// interface Metadata {
//   model?: string;
//   lensModel?: string;
//   fNumber?: number;
//   exposureTime?: string;
//   iso?: number;
//   createDate?: string | ExifDateTime;
//   latitude?: number;
//   longitude?: number;
//   exposureCompensation?: number;
// }

import { useEffect, useState } from 'react';
import { Image } from '../models/Image';
import CardView from './CardView';
import SlideView from './SlideView';
import ImageModal from './ImageModal';
import ImageUpload from './ImageUpload';

const Gallery = () => {
  const [view, setView] = useState<'card' | 'slide'>('card');
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);

  const [images, setImages] = useState<Image[]>([]);

  useEffect(() => {
    fetch('/api/getImages')
      .then((response) => {
        if (!response.ok) {
          console.log('response', response);
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => setImages(data.data));
  }, []);

  return (
    <div>
      <div className="toolbar">
        <div className="tags">
          <span className="v-icon">V</span>
          {/* Tag buttons here */}
        </div>
        <div>
          <ImageUpload />
        </div>
        <div className="view-switch">
          <button onClick={() => setView('card')}>Card View</button>
          <button onClick={() => setView('slide')}>Slide View</button>
        </div>
      </div>
      {view === 'card' ? (
        <CardView images={images} onSelectImage={setSelectedImage} />
      ) : (
        <SlideView images={images} onSelectImage={setSelectedImage} />
      )}
      {selectedImage && <ImageModal image={selectedImage} onClose={() => setSelectedImage(null)} />}
    </div>
  );
};

export default Gallery;
