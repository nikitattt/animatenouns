import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Animate Nouns</title>
        <meta name="description" content="Animate your noun here" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Animate Your Lil Noun. Coming Soon.</h1>
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
};

export default Home;
