import { Artist } from '../../utils/types/artist'
import ArtistBox from '../ArtistBox'

const ArtistsList = ({ artists }: { artists: Artist[] }) => {
  return (
    <div className="mt-8 flex flex-col gap-4">
      {artists.map(function (artist, place) {
        return (
          <div key={place}>
            <ArtistBox artist={artist} />
          </div>
        )
      })}
    </div>
  )
}

export default ArtistsList
