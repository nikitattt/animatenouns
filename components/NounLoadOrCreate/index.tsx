import CollectionSelect from '../CollectionSelect'
import RandomNoun from '../RandomNoun'
import TraitsSelect from '../TraitsSelect'

const NounLoadOrCreate = () => {
  return (
    <div className="flex flex-column">
      <CollectionSelect />
      <TraitsSelect />
      <RandomNoun />
    </div>
  )
}

export default NounLoadOrCreate
