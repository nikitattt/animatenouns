import { Artist } from '../../utils/types/artist'

const ArtistsList = ({ artists }: { artists: Artist[] }) => {
  return (
    <div className="mt-8 flex flex-col gap-4">
      {artists.map(function (artist, place) {
        return (
          <div key={place} className="w-full rounded-2xl bg-teal h-60">
            <div className="mt-4 ml-4">
              <p className="text-2xl font-semibold">{artist.name}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default ArtistsList
