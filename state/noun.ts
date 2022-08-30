import { AlchemyProvider } from '@ethersproject/providers'
import create from 'zustand'

import { constructContract } from '../utils/constructContract'

type Seed = {
  head: number
  glasses: number
  body: number
  accessory: number
  background: number
}

enum Collections {
  nouns = 'Nouns',
  lilNouns = 'Lil Nouns'
}

interface NounState {
  collection: undefined | Collections
  activeNoun: undefined | Seed
  setStatus: (collection: string) => void
  setActiveNoun: (seed: Seed) => void
}

const useNounStore = create<NounState>((set, get) => ({
  collection: undefined,
  activeNoun: undefined,
  setStatus: (collection: string) => {
    if (collection as Collections) {
      set({ collection: collection as Collections })
    } else {
      set({ collection: undefined, activeNoun: undefined })
    }
  },
  setActiveNoun: (seed: Seed) => set({ activeNoun: seed })
}))

export type { NounState, Seed }

export { useNounStore, Collections }
