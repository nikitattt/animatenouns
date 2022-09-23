import create from 'zustand'
import { animationClass } from '../utils/animationClass'
import { Collections } from '../utils/types/collections'
import { Seed } from '../utils/types/seed'

interface NounState {
  collection: undefined | Collections
  activeNoun: undefined | Seed
  animation: undefined | string
  animatedNoun: undefined | string
  animationInProgress: boolean
  setStatus: (collection: string) => void
  setActiveNoun: (seed: Seed) => void
  setAnimation: (name: string) => Promise<void>
}

const useNounStore = create<NounState>((set, get) => ({
  collection: undefined,
  activeNoun: undefined,
  animation: undefined,
  animatedNoun: undefined,
  animationInProgress: false,
  setStatus: (collection: string) => {
    if (collection as Collections) {
      set({ collection: collection as Collections, activeNoun: undefined })
    } else {
      set({ collection: undefined, activeNoun: undefined })
    }
  },
  setActiveNoun: (seed: Seed) => {
    set({ activeNoun: seed, animatedNoun: undefined, animation: undefined })
  },
  setAnimation: async (name: string) => {
    set({ animation: name, animationInProgress: true })

    const collection = get().collection
    const activeNoun = get().activeNoun
    const animation = get().animation

    if (collection && activeNoun && animation) {
      const lilsAnimations = animationClass(collection)

      const src = await lilsAnimations.standardGlasses
        .find((a) => a.name === animation)
        ?.animateNoun(activeNoun)

      set({ animatedNoun: src, animationInProgress: false })
    } else {
      set({ animationInProgress: false })
    }
  }
}))

export type { NounState }

export { useNounStore }
