import CollectionSelect from '../CollectionSelect'
import RandomNoun from '../RandomNoun'
import TraitsSelect from '../TraitsSelect'

const NounLoadOrCreate = () => {
  return (
    <div className="flex flex-col min-w-full gap-4">
      <CollectionSelect />
      <TraitsSelect />
      <RandomNoun />
    </div>
  )
}

export default NounLoadOrCreate
