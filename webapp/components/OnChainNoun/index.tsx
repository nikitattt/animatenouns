import { AlchemyProvider } from '@ethersproject/providers'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useNounStore } from '../../state/noun'
import { constructContract } from '../../utils/constructContract'
import { Seed } from '../../utils/types/seed'

const OnChainNoun = () => {
  const collection = useNounStore((state) => state.collection)
  const setActiveNoun = useNounStore((state) => state.setActiveNoun)
  const [id, setId] = useState<undefined | number>(undefined)

  const loadNounFromChain = async () => {
    if (collection === undefined) {
      toast.error('Choose a collection first!')
      return
    } else if (id === undefined) {
      toast.error('Tell me Id of the noun to load')
      return
    } else if (id < 0) {
      toast.error('Id should be bigger than 0')
      return
    }

    const provider = new AlchemyProvider('homestead', process.env.NEXT_PUBLIC_ALCHEMY_ID)

    const tokenContract = constructContract(collection, provider)

    const toastId = toast.loading('Loading...')

    const seed: Seed = await tokenContract.seeds(id)

    if (
      seed.head === 0 &&
      seed.glasses === 0 &&
      seed.body === 0 &&
      seed.accessory === 0 &&
      seed.background === 0
    ) {
      toast.error('This noun has not been born yet', {
        id: toastId
      })
    } else {
      toast.success('All good!', {
        id: toastId
      })
      setActiveNoun(seed)
    }
  }

  const input = (
    <input
      className="w-24 p-1.5 rounded-lg outline-black font-medium"
      type="number"
      value={id}
      min="0"
      step="1"
      onChange={(e) => setId(Number(e.target.value))}
      placeholder="Id"
    />
  )

  const button = (
    <button
      className="bg-black text-white py-1 px-3 rounded-lg text-sm"
      onClick={loadNounFromChain}
    >
      Animate
    </button>
  )

  return (
    <div className="p-2 w-full px-2 bg-teal rounded-2xl">
      <div className="hidden sm:flex flex-row justify-between items-center">
        <div className="ml-1 font-medium">On-Chain Noun</div>
        <div className="flex flex-row gap-2 items-center">
          {input}
          {button}
        </div>
      </div>
      <div className="flex sm:hidden flex-col gap-2">
        <div className="flex flex-row justify-between items-center">
          <div className="ml-1 text-lg font-medium">On-Chain Noun</div>
          {input}
        </div>
        {button}
      </div>
    </div>
  )
}

export default OnChainNoun
