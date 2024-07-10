import { useEffect, useState } from 'react';

const ImageGallery = ({ folder }: { folder: string }) => {
  const [images, setImages] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [metadata, setMetadata] = useState<any>(null);

  useEffect(() => {
    if (folder) {
        console.log('start')
      fetch(`/api/getImages?folderPath=${folder}`)
        .then(response => response.json())
        .then(data => setImages(data));
    }
  }, [folder]);

  const handleImageClick = (image: string) => {
    setSelectedImage(image);
    fetch(`/api/getImageMetadata?imagePath=${image}`)
      .then(response => response.json())
      .then(data => setMetadata(data));
  };

  return (
    <div>
      <div className="flex overflow-x-scroll space-x-4">
        {images.map(image => (
          <img
            key={image}
            src={`/${image}`}
            className="h-32 cursor-pointer"
            onClick={() => handleImageClick(image)}
          />
        ))}
      </div>
      {selectedImage && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75">
          <div className="relative">
            <img src={`/${selectedImage}`} className="h-64" />
            {metadata && (
              <div className="absolute bottom-0 left-0 bg-black bg-opacity-50 text-white p-2">
                <p>Size: {metadata.size} bytes</p>
                <p>Dimensions: {metadata.dimensions.width}x{metadata.dimensions.height}</p>
              </div>
            )}
            <button className="absolute top-0 right-0 p-2 text-white" onClick={() => setSelectedImage(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
