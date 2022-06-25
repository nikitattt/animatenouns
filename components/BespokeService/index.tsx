import { Artist } from '../../utils/types/artist'
import ArtistsList from '../ArtistsList'

const BespokeService = ({ artists }: { artists: Artist[] }) => {
  return (
    <div className="mt-20 flex flex-col">
      <p className="font-bold text-4xl text-pink">Bespoke Services</p>
      <div className="mt-8">
        <p className="text-2xl font-bold">
          Want to have more special animations?{' '}
          <span className="text-grey">We got you covered</span>
        </p>
        <p className="text-lg">
          Commision one of the artists that will craft you beautiful full
          feature animated noun
        </p>
      </div>
      <ArtistsList artists={artists} />
    </div>
  )
}

export default BespokeService
