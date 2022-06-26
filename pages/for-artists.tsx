import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import NavBar from '../components/NavBar'

const ForArtists: NextPage = () => {
  return (
    <div className="font-sans text-black-text flex flex-col h-screen">
      <Head>
        <title>Animate Nouns - For Artists</title>
        <meta name="description" content="Animate your noun here" />
      </Head>

      <NavBar />
      <main className="mt-20 px-8 sm:px-20 md:px-40">
        <div className="w-full">
          <p className="max-w-prose text-center mx-auto">
            If you are a pixel animation artist and would like to animate the
            nouniverse, apply to be featured in our bespoke artist directory:
          </p>
          <div className="mt-8 cursor-pointer bg-pink px-8 py-3 w-max rounded-2xl mx-auto">
            <Link href="/artist-form">
              <p className="text-white font-black">Apply as an artist</p>
            </Link>
          </div>
        </div>
      </main>

      <footer className="mt-20"></footer>
    </div>
  )
}

export default ForArtists
