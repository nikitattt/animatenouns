import { Artist } from '../../utils/types/artist'
import ArtistsList from '../ArtistsList'

const BespokeService = ({ artists }: { artists: Artist[] }) => {
  return (
    <div className="flex flex-row">
      <p className="font-black text-3xl">Bespoke Services</p>
      <ArtistsList artists={artists} />
    </div>
  )
}

export default BespokeService
