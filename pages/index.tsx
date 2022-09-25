import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { Toaster } from 'react-hot-toast'
import AnimateNoun from '../components/AnimateNoun'
import BespokeService from '../components/BespokeService'
import NavBar from '../components/NavBar'
import ProgressOverlay from '../components/ProgressOverlay'
import { Artist } from '../utils/types/artist'

const Home: NextPage<{ data: string }> = (props) => {
  const { data } = props

  const artists: Artist[] = JSON.parse(data)

  return (
    <div className="font-sans text-black-text flex flex-col h-screen">
      <Head>
        <title>Animate Nouns</title>
        <meta name="description" content="Animate your noun here" />
      </Head>
      <Toaster position="top-right" />

      <NavBar />
      <main className="mt-20 px-8 sm:px-20 md:px-40">
        <AnimateNoun />
        <div id="bespoke">
          <BespokeService artists={artists} />
        </div>
      </main>

      <footer className="flex flex-row justify-between mt-20 pb-6 px-8 text-pink">
        <div>
          Made with <span className="text-sm">♥</span> by{' '}
          <a
            type="_blank"
            href="https://twitter.com/iamng_eth"
            className="underline hover:no-underline"
          >
            ng
          </a>
        </div>
        <div className="underline hover:no-underline">
          <Link href="/artist-form">Apply as an animation artist</Link>
        </div>
        {/* To center middle elements */}
        <div className="invisible">Made with ♥ by ng</div>
      </footer>
      <ProgressOverlay />
    </div>
  )
}

export async function getStaticProps() {
  const artists: Artist[] = [
    // {
    //   name: 'Nounimator Jake',
    //   dateAdded: '',
    //   lastUpdate: '',
    //   shortDescription:
    //     'I create different nice animations. I am very good at it and bla bla bla ',
    //   longBio:
    //     'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi ut sagittis elit. Aliquam pharetra, felis hendrerit vulputate egestas, dolor odio tincidunt eros, non congue dui urna hendrerit tortor. Donec dapibus, magna in malesuada ullamcorper, mauris nisi lacinia erat, eget maximus ligula ligula sed lacus. Quisque posuere neque eu purus volutpat tempor. Donec eget enim et augue egestas mattis eu eu ligula. Praesent vulputate nibh id erat auctor, quis dictum justo dignissim.',
    //   workExamples: ['', '', ''],
    //   contacts: {
    //     twitter: '@nounimator',
    //     discord: 'nounimator#0001',
    //     email: 'nounimator@nouns.wtf'
    //   },
    //   workCost: {
    //     preferredCurrency: 'USD',
    //     whenOne: 10
    //   }
    // },
    {
      name: 'We are searching',
      dateAdded: '',
      lastUpdate: '',
      shortDescription:
        'This is just placeholder :( We are actively searching for the artists. Are you are a pixel animation artist and would like to animate the nouniverse? Contact us to be featured in our bespoke artist directory!',
      workExamples: [
        'https://i.imgur.com/9VkFQaU.gif',
        'https://i.imgur.com/nimEegS.gif',
        'https://i.imgur.com/AJXPeyI.gif'
      ],
      contacts: {
        twitter: '@iamng_eth',
        discord: 'iamng#3884'
      },
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
