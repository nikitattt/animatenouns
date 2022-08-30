import { Collections, useNounStore } from "../../state/noun"

const CollectionSelect = () => {
  const collection = useNounStore(state => state.collection)
  const setStatus = useNounStore(state => state.setStatus)

  console.log(collection)

  return (
    <div className="p-3 w-full bg-teal rounded-2xl">
      <div className="flex flex-row justify-between">
        <label className="ml-1 text-lg font-medium" htmlFor="collections">Collection</label>
        <select
          className="p-1 rounded-lg outline-black"
          name="collections"
          id="collections"
          onChange={(e) => setStatus(e.target.value)}
          value={collection}
        >
          <option value=''>Select Collection</option>
          <option value={Collections.lilNouns}>{Collections.lilNouns}</option>
          <option value={Collections.nouns}>{Collections.nouns}</option>
        </select>
      </div>
    </div>
  )
}

export default CollectionSelect
