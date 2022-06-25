import type { NextPage } from 'next'
import Head from 'next/head'
import AnimateNoun from '../components/AnimateNoun'
import BespokeService from '../components/BespokeService'
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
      <main className="mt-20 px-8 sm:px-40">
        <AnimateNoun />
        <BespokeService artists={[]} />
      </main>

      <footer className=""></footer>
    </div>
  )
}

export default Home
