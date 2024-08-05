import Head from 'next/head';
import Image from 'next/image';
import Gallery from '../components/Gallery';
import styles from '../styles/Home.module.css';

const Home = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Image Gallery</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.logo}>
          <Image src="/logo.png" alt="Logo" width={128} height={128} />
        </div>
        <Gallery />
      </main>
    </div>
  );
};

export default Home;
