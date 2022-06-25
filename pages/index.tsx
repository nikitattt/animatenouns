import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import AnimateNoun from '../components/AnimateNoun'
import BespokeService from '../components/BespokeService'
import NavBar from '../components/NavBar'
import { Artist } from '../utils/types/artist'

const Home: NextPage<{ data: string }> = (props) => {
  const { data } = props

  const artists: Artist[] = JSON.parse(data)

  return (
    <div className="font-sans text-black-text flex flex-col h-screen">
      <Head>
        <title>Animate Nouns</title>
        <meta name="description" content="Animate your noun here" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NavBar />
      <main className="mt-20 px-8 sm:px-20 md:px-40">
        <AnimateNoun />
        <div id="bespoke">
          <BespokeService artists={artists} />
        </div>
      </main>

      <footer className="flex mt-20">
        <div className="mx-auto mb-6 text-pink underline hover:no-underline">
          <Link href="/artist-form">Apply as an animation artist</Link>
        </div>
      </footer>
    </div>
  )
}

export async function getStaticProps() {
  const artists: Artist[] = [
    {
      name: 'Nounimator Jake',
      dateAdded: '',
      lastUpdate: '',
      shortDescription: '',
      workExamples: ['', '', ''],
      contacts: {},
      workCost: {
        preferredCurrency: 'USD',
        whenOne: 10
      }
    },
    {
      name: 'Nounimator Kane',
      dateAdded: '',
      lastUpdate: '',
      shortDescription: '',
      workExamples: ['', '', '', ''],
      contacts: {},
      workCost: {
        preferredCurrency: 'USD',
        whenOne: 10
      }
    }
  ]

  const data = JSON.stringify(artists)

  return {
    props: {
      data
    }
  }
}

export default Home
