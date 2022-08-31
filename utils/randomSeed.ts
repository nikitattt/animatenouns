import { getNounSeedFromBlockHash as getLilNounSeedFromBlockHash } from '@lilnouns/assets'
import { getNounSeedFromBlockHash } from '@nouns/assets'
import { Collections } from '../state/noun'

export const randomSeed = (collection: Collections) => {
  const blockHash =
    '0x5014101691e81d79a2eba711e698118e1a90c9be7acb2f40d7f200134ee53e01'
  const nounId = Math.floor(Math.random() * 1000000 + 1)

  let seed

  if (collection === Collections.lilNouns) {
    seed = getLilNounSeedFromBlockHash(nounId, blockHash)
  } else {
    seed = getNounSeedFromBlockHash(nounId, blockHash)
  }

  return seed
}
