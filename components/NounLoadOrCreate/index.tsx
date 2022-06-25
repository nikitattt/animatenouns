import CollectionSelect from '../CollectionSelect'
import TraitsSelect from '../TraitsSelect'

const NounLoadOrCreate = () => {
  return (
    <div className="flex flex-column">
      <CollectionSelect />
      <TraitsSelect />
    </div>
  )
}

export default NounLoadOrCreate
