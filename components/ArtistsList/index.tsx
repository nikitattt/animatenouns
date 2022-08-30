import { Artist } from '../../utils/types/artist'
import ArtistCard from '../ArtistCard'

const ArtistsList = ({ artists }: { artists: Artist[] }) => {
  return (
    <div className="mt-8 flex flex-col gap-4">
      {artists.map(function (artist, place) {
        return (
          <div key={place}>
            <ArtistCard artist={artist} />
          </div>
        )
      })}
    </div>
  )
}

export default ArtistsList
