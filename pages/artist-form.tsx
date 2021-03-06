import type { NextPage } from 'next'
import Head from 'next/head'

const ArtistForm: NextPage = () => {
  return (
    <div className="h-full">
      <Head>
        <title>Animate Nouns - Artist Form</title>
        <meta name="description" content="Animate your noun here" />
      </Head>

      <main>
        <p className="mt-8 sm:mt-20 text-2xl text-grey text-center">
          If you do not see the form and see this text, please refresh the page
        </p>
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

export default ArtistForm
