import { Collections, useNounStore } from '../../state/noun'
import CollectionSelect from '../CollectionSelect'
import OnChainNoun from '../OnChainNoun'
import RandomNoun from '../RandomNoun'
import TraitsSelect from '../TraitsSelect'

const NounSelectAndActions = () => {
  const collection = useNounStore(state => state.collection)

  let actions = <></>

  switch (collection) {
    case Collections.lilNouns:
      actions = (
        <div className="mt-4 flex flex-col gap-4">
          <OnChainNoun />
          <TraitsSelect />
          <RandomNoun />
        </div>
      )
      break;
    case Collections.nouns:
      actions = (
        <div className="mt-4 flex flex-col gap-4">
          {/* <TraitsSelect />
          <RandomNoun /> */}
        </div>
      )
      break;
    default:
      actions = (
        <div className='mt-2 text-center text-grey text-sm'>
          Select collection to see available actions
        </div>
      )
  }

  return (
    <div className="flex flex-col min-w-full">
      <CollectionSelect />
      {actions}
    </div>
  )
}

export default NounSelectAndActions
