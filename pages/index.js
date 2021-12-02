import { useRef } from "react";
import Head from "next/head";
import styles from "styles/Home.module.css";

export default function Home() {
  const algorithmInputRef = useRef();

  const fetchClusters = async () => {
    const url = new URL("http://localhost:3000/api/cluster");
    const params = { algorithm: algorithmInputRef.current.value };
    url.search = new URLSearchParams(params).toString();
    console.log(url);

    const res = await fetch(url);
    const data = await res.json();
    console.log(data);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>2dv515 | Assignment 2</title>
        <meta name="description" content="2dv515 Assignment 2" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <select ref={algorithmInputRef}>
          <option value="kMeans">k-means</option>
          <option value="hierarchical">hierarchical</option>
        </select>
        <button
          onClick={async () => {
            await fetchClusters();
          }}
        >
          FETCH
        </button>
      </main>
    </div>
  );
}
