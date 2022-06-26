import { useState } from 'react'
import { Artist } from '../../utils/types/artist'

const ArtistCard = ({ artist }: { artist: Artist }) => {
  const [showLongBio, setShowLongBio] = useState(false)

  return (
    <div className="w-full flex flex-col rounded-2xl bg-teal p-4">
      <p className="text-2xl font-semibold">{artist.name}</p>
      <p className="my-1 text-grey-dark text-lg">{artist.shortDescription}</p>
      {artist.longBio && (
        <div className="my-2 bg-white bg-opacity-40 w-max py-0.5 pl-4 pr-3 rounded-lg">
          <button onClick={() => setShowLongBio(!showLongBio)}>
            <div className="flex flex-row items-center fill-grey gap-px">
              <p className="text-grey font-semibold">More info</p>
              {showLongBio ? (
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
      )}
      {showLongBio && <p className="text-grey-dark">{artist.longBio}</p>}
      <p className="mt-2 font-bold text-sm text-grey opacity-70">
        Work examples:
      </p>
      <div className="mt-2 flex flex-row gap-2 overflow-scroll">
        {artist.workExamples.map(function (image, place) {
          return (
            <div key={place}>
              <div className="h-40 w-40 rounded-2xl bg-white bg-opacity-30">
                {/* <img src={image} alt="Animated noun" /> */}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ArtistCard
