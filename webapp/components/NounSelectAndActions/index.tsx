import { useNounStore } from '../../state/noun'
import { Collections } from '../../utils/types/collections'
import CollectionSelect from '../CollectionSelect'
import OnChainNoun from '../OnChainNoun'
import RandomNoun from '../RandomNoun'
import SaveNoun from '../SaveNoun'
import TraitsSelect from '../TraitsSelect'
import UploadImage from '../UploadImage'

const NounSelectAndActions = () => {
  const collection = useNounStore((state) => state.collection)

  let actions = <></>

  switch (collection) {
    case Collections.lilNouns:
      actions = (
        <div className="flex flex-col gap-4">
          <OnChainNoun />
          <UploadImage />
          <TraitsSelect />
          <RandomNoun />
          <SaveNoun />
        </div>
      )
      break
    case Collections.nouns:
      actions = (
        <div className="flex flex-col gap-4">
          <OnChainNoun />
          <UploadImage />
          <TraitsSelect />
          <RandomNoun />
          <SaveNoun />
        </div>
      )
      break
    default:
      actions = (
        <div className="p-4 w-full bg-grey-light bg-opacity-10 rounded-2xl">
          <div className="text-center text-grey text-sm">
            Select collection to get started!
          </div>
        </div>
      )
  }

  return (
    <div className="flex flex-col min-w-full gap-4">
      <CollectionSelect />
      {actions}
    </div>
  )
}

export default NounSelectAndActions
