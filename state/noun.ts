import create from 'zustand'
import { Collections } from '../utils/types/collections'
import { Seed } from '../utils/types/seed'

interface NounState {
  collection: undefined | Collections
  activeNoun: undefined | Seed
  animation: undefined | string
  setStatus: (collection: string) => void
  setActiveNoun: (seed: Seed) => void
  setAnimation: (name: string) => void
}

const useNounStore = create<NounState>((set, get) => ({
  collection: undefined,
  activeNoun: undefined,
  animation: undefined,
  setStatus: (collection: string) => {
    if (collection as Collections) {
      set({ collection: collection as Collections, activeNoun: undefined })
    } else {
      set({ collection: undefined, activeNoun: undefined })
    }
  },
  setActiveNoun: (seed: Seed) => set({ activeNoun: seed }),
  setAnimation: (name: string) => set({ animation: name })
}))

export type { NounState }

export { useNounStore }
