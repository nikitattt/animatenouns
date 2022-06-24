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
      <main>
        <iframe
          className="absolute top-0 bottom-0 left-0 right-0"
          src={process.env.ARTIST_FORM_LINK}
          width="100%"
          height="100%"
          title="Apply as Bespoke Artist"
        ></iframe>
      </main>

      <footer></footer>
    </div>
  )
}

export default Home
