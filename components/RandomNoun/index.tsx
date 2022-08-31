import { getNounSeedFromBlockHash as getLilNounSeedFromBlockHash } from '@lilnouns/assets'
import { getNounSeedFromBlockHash } from '@nouns/assets'
import { Collections, useNounStore } from '../../state/noun'

const RandomNoun = () => {
  const collection = useNounStore((state) => state.collection)
  const setActiveNoun = useNounStore((state) => state.setActiveNoun)

  const randomSeed = () => {
    const blockHash =
      '0x5014101691e81d79a2eba711e698118e1a90c9be7acb2f40d7f200134ee53e01'
    const nounId = Math.floor(Math.random() * 1000000 + 1)

    switch (collection) {
      case Collections.lilNouns:
        setActiveNoun(getLilNounSeedFromBlockHash(nounId, blockHash))
        break
      case Collections.nouns:
        setActiveNoun(getNounSeedFromBlockHash(nounId, blockHash))
        break
    }
  }

  const fireIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className="w-5 h-5 stroke-white"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z"
      />
    </svg>
  )

  return (
    <button className="p-3 w-full bg-black rounded-2xl" onClick={randomSeed}>
      <div className="flex flex-row justify-center items-center gap-1">
        <div className="text-white font-medium text-sm">
          I'll play my luck - Random
        </div>
        {fireIcon}
      </div>
    </button>
  )
}

export default RandomNoun
