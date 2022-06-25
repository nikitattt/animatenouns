import CollectionSelect from '../CollectionSelect'
import RandomNoun from '../RandomNoun'
import TraitsSelect from '../TraitsSelect'

const NounLoadOrCreate = () => {
  return (
    <div className="flex flex-column min-w-full">
      <CollectionSelect />
      <TraitsSelect />
      <RandomNoun />
    </div>
  )
}

export default NounLoadOrCreate
