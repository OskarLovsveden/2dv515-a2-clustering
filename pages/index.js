import { useRef, useState } from "react";
import Head from "next/head";
import styles from "styles/Home.module.css";
import Cluster from "components/Cluster";

export default function Home() {
  const [clusters, setClusters] = useState([]);
  const algorithmInputRef = useRef();

  const fetchClusters = async () => {
    const url = new URL("http://localhost:3000/api/cluster");
    const params = { algorithm: algorithmInputRef.current.value };
    url.search = new URLSearchParams(params).toString();

    const res = await fetch(url);
    const data = await res.json();
    setClusters(data);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>2dv515 | Assignment 2</title>
        <meta name="description" content="2dv515 Assignment 2" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <section className="mb-m">
          <select ref={algorithmInputRef} className="p05">
            <option value="kMeans">k-means</option>
            <option value="hierarchical">hierarchical</option>
          </select>
          <button
            className="ml-s p05"
            onClick={async () => {
              await fetchClusters();
            }}
          >
            FETCH
          </button>
        </section>
        <section>
          {clusters.map((cluster, index) => (
            <Cluster key={index} data={cluster} />
          ))}
        </section>
      </main>
    </div>
  );
}
