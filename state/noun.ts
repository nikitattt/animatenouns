import create from 'zustand'

enum Collections {
  nouns = 'Nouns',
  lilNouns = 'Lil Nouns'
}

interface NounState {
  collection: undefined | Collections
  setStatus: (collection: string) => void
}

const useNounStore = create<NounState>((set, get) => ({
  collection: undefined,
  setStatus: (collection: string) => {
    if (collection as Collections) {
      set({ collection: collection as Collections })
    } else {
      set({ collection: undefined })
    }
  }
}))

export type { NounState }

export { useNounStore, Collections }
