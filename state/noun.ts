import create from 'zustand'
import { Collections } from '../utils/types/collections'
import { Seed } from '../utils/types/seed'

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
      set({ collection: collection as Collections, activeNoun: undefined })
    } else {
      set({ collection: undefined, activeNoun: undefined })
    }
  },
  setActiveNoun: (seed: Seed) => set({ activeNoun: seed })
}))

export type { NounState }

export { useNounStore }
