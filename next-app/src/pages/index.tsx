import { useState } from 'react';
import FolderNavigator from '../components/FolderNavigator';
import ImageGallery from '../components/ImageGallery';

const HomePage = () => {
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);

  return (
    <div className="p-4">
      <h1 className="text-2x1 font-bold mb-4">Photo Gallery</h1>
      <FolderNavigator onSelect={setSelectedFolder} />
      {selectedFolder && <ImageGallery folder={selectedFolder} />}
    </div>
  );
};

export default HomePage;