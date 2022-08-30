import { useState } from 'react'
import { Artist } from '../../utils/types/artist'

const ArtistContactCopyButton = ({ text }: { text: string }) => {
  return (
    <button onClick={() => navigator.clipboard.writeText(text)}>
      <div className="w-8 h-8 bg-white bg-opacity-40 rounded-lg flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 fill-grey-dark"
          viewBox="0 0 20 20"
        >
          <path d="M7 9a2 2 0 012-2h6a2 2 0 012 2v6a2 2 0 01-2 2H9a2 2 0 01-2-2V9z" />
          <path d="M5 3a2 2 0 00-2 2v6a2 2 0 002 2V5h8a2 2 0 00-2-2H5z" />
        </svg>
      </div>
    </button>
  )
}

const ArtistContactNewPage = ({ link }: { link: string }) => {
  return (
    <a href={link} target="_blank" rel="noopener noreferrer">
      <div className="w-8 h-8 bg-white bg-opacity-40 rounded-lg flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 fill-grey-dark"
          viewBox="0 0 20 20"
        >
          <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
          <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
        </svg>
      </div>
    </a>
  )
}

const ArtistCardButton = ({
  onClick,
  text,
  active = false
}: {
  onClick: () => void
  text: string
  active?: boolean
}) => {
  return (
    <div className="my-2 bg-white bg-opacity-40 w-max py-0.5 pl-4 pr-3 rounded-lg">
      <button onClick={onClick}>
        <div className="flex flex-row items-center fill-grey gap-px">
          <p className="text-grey font-medium">{text}</p>
          {active ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </div>
      </button>
    </div>
  )
}

const ArtistCard = ({ artist }: { artist: Artist }) => {
  const [showLongBio, setShowLongBio] = useState(false)
  const [showContacts, setShowContacts] = useState(false)

  return (
    <div className="w-full flex flex-col rounded-2xl bg-teal p-4">
      <p className="text-2xl font-semibold">{artist.name}</p>
      <p className="my-1 text-grey-dark text-base">{artist.shortDescription}</p>
      <div className="flex flex-row gap-2">
        {artist.longBio && (
          <ArtistCardButton
            onClick={() => setShowLongBio(!showLongBio)}
            text="More Info"
            active={showLongBio}
          />
        )}
        <ArtistCardButton
          onClick={() => setShowContacts(!showContacts)}
          text="Contacts"
          active={showContacts}
        />
      </div>
      {showLongBio && <p className="text-grey-dark">{artist.longBio}</p>}
      {showContacts && (
        <div>
          {artist.contacts.twitter && (
            <div className="my-2 flex flex-col">
              <div className="flex flex-row gap-2 items-center">
                <div className="h-8 flex flex-row items-center gap-2">
                  <div className="w-6 h-6 flex items-center">
                    <img src="icons/twitter.svg" />
                  </div>
                  <p className="text-brand-twitter font-semibold">
                    {artist.contacts.twitter}
                  </p>
                </div>
                <ArtistContactCopyButton text={artist.contacts.twitter} />
                <ArtistContactNewPage
                  link={`https://twitter.com/${artist.contacts.twitter.substring(
                    1
                  )}`}
                />
              </div>
            </div>
          )}
          {artist.contacts.discord && (
            <div className="my-2 flex flex-col">
              <div className="flex flex-row gap-2 items-center">
                <div className="h-8 flex flex-row items-center gap-2">
                  <div className="w-6 h-6 flex items-center">
                    <img src="icons/discord.svg" />
                  </div>
                  <p className="text-brand-discord font-semibold">
                    {artist.contacts.discord}
                  </p>
                </div>
                <ArtistContactCopyButton text={artist.contacts.discord} />
              </div>
            </div>
          )}
          {artist.contacts.email && (
            <div className="my-2 flex flex-col">
              <div className="flex flex-row gap-2 items-center">
                <div className="h-8 flex flex-row items-center gap-2">
                  <div className="w-6 h-6 flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 stroke-grey"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={3}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                      />
                    </svg>
                  </div>
                  <p className="text-grey font-semibold">{artist.contacts.email}</p>
                </div>
                <ArtistContactCopyButton text={artist.contacts.email} />
                <ArtistContactNewPage
                  link={`mailto:${artist.contacts.email}?subject=Noun Animation Request`}
                />
              </div>
            </div>
          )}
        </div>
      )}

      <p className="mt-2 font-semibold text-sm text-grey opacity-70">
        Work examples:
      </p>
      <div className="mt-2 flex flex-row gap-2 overflow-scroll no-scrollbar">
        {artist.workExamples.map(function (image, place) {
          return (
            <div key={place}>
              <div className="h-40 w-40">
                <img className='rounded-2xl' src={image} alt="Animated noun" />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ArtistCard
