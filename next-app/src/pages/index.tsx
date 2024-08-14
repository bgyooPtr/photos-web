import Gallery from '../components/Gallery';
import styles from '../styles/Home.module.css';

const Home = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>
        Image Gallery<span>Test</span>
      </h1>
      <Gallery />
    </div>
  );
};

export default Home;
