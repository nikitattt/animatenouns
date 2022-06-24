import type { NextPage } from 'next'
import Head from 'next/head'
import NavBar from '../components/NavBar'

const Home: NextPage = () => {
  return (
    <div className="h-full">
      <Head>
        <title>Animate Nouns Artist Form</title>
        <meta name="description" content="Animate your noun here" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NavBar />
      <main className="">
        <iframe
          className="absolute top-0 bottom-0 left-0 right-0"
          src="https://tally.so/r/waQB4Z?transparentBackground=1"
          width="100%"
          height="100%"
          title="Animate Nouns Bespoke Artist Directory"
        ></iframe>
      </main>

      <footer className=""></footer>
    </div>
  )
}

export default Home
