import type { NextPage } from 'next'
import Head from 'next/head'

const Home: NextPage = () => {
  return (
    <div className="font-sans text-black-text flex flex-col h-screen">
      <Head>
        <title>Animate Nouns</title>
        <meta name="description" content="Animate your noun here" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="mt-20 px-8">
        <h1 className="font-display font-bold text-5xl text-red text-center">
          Animate Your Lil Noun. Coming Soon.
        </h1>
      </main>

      <footer className=""></footer>
    </div>
  )
}

export default Home
