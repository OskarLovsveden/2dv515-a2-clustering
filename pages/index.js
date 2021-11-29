import Head from 'next/head'
import styles from '../styles/Home.module.css'

export async function getServerSideProps() {
  const res = await fetch(`http://localhost:3000/api/hello`)
  const data = await res.json()

  return { props: { data } }
}

export default function Home({ data }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>2dv515 | Assignment 2</title>
        <meta name="description" content="2dv515 Assignment 2" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <p>{data.name}</p>
      </main>
    </div>
  )
}
