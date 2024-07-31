import ImageGallery from '../components/ImageGallery';
import ImageUpload from '../components/ImageUpload';

const Home = () => {
  return (
    <div>
      <h1>Image Gallery</h1>
      <ImageUpload />
      <ImageGallery />
    </div>
  );
};

export default Home;
