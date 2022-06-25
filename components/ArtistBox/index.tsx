import { Artist } from '../../utils/types/artist'

const ArtistBox = ({ artist }: { artist: Artist }) => {
  return (
    <div className="w-full flex flex-col rounded-2xl bg-teal p-4">
      <p className="text-2xl font-semibold">{artist.name}</p>
      <p className="mt-2 font-bold text-sm text-grey opacity-70">
        Work examples:
      </p>
      <div className="mt-2 flex flex-row gap-2 overflow-scroll">
        {artist.workExamples.map(function (image, place) {
          return (
            <div key={place}>
              <div className="h-40 w-40 rounded-2xl bg-white bg-opacity-30">
                <img src={image} />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ArtistBox
