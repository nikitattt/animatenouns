import { useNounStore } from '../../state/noun'
import { Collections } from '../../utils/types/collections'

const CollectionSelect = () => {
  const collection = useNounStore((state) => state.collection)
  const setStatus = useNounStore((state) => state.setStatus)

  return (
    <div className="p-3 w-full bg-teal rounded-2xl">
      <div className="flex flex-row justify-between items-center">
        <label className="ml-1 font-medium" htmlFor="collections">
          Collection
        </label>
        <select
          className="p-1 rounded-lg outline-black"
          name="collections"
          id="collections"
          onChange={(e) => setStatus(e.target.value)}
          value={collection}
        >
          <option value="">Select</option>
          <option value={Collections.lilNouns}>{Collections.lilNouns}</option>
          <option value={Collections.nouns}>{Collections.nouns}</option>
        </select>
      </div>
    </div>
  )
}

export default CollectionSelect
