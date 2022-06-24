import { Artist } from '../../utils/types/artist'

const ArtistsList = ({ artists }: { artists: Artist[] }) => {
  return (
    <div className="flex flex-row gap-4">
      {artists.map(function (artist, place) {
        return (
          <div key={place} className="w-full rounded-2xl bg-sky">
            <div>
              <p className="font-bold text-2xl">{artist.name}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default ArtistsList
