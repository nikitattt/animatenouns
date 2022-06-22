import type { NextPage } from 'next'
import Head from 'next/head'
import NavBar from '../components/NavBar'

const Home: NextPage = () => {
  return (
    <div className="font-sans text-black-text flex flex-col h-screen">
      <Head>
        <title>Animate Nouns</title>
        <meta name="description" content="Animate your noun here" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NavBar />
      <main className="mt-20 px-8">
        <p className="font-display text-5xl text-black-text text-center">
          Animate Your Lil Noun.
        </p>
        <p className="mt-2 font-display text-5xl text-black-text text-center">
          Coming Soon.
        </p>
      </main>

      <footer className=""></footer>
    </div>
  )
}

export default Home
