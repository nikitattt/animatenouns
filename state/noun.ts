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
    let collectionToSet

    if (collection as Collections) {
      collectionToSet = collection as Collections
    } else {
      collectionToSet = undefined
    }

    set({
      collection: collectionToSet,
      activeNoun: undefined,
      animatedNoun: undefined,
      animation: undefined
    })
  },
  setActiveNoun: (seed: Seed) => {
    if (!get().animationInProgress) {
      set({ activeNoun: seed, animatedNoun: undefined, animation: undefined })
    }
  },
  setAnimation: async (name: string) => {
    const collection = get().collection
    const activeNoun = get().activeNoun
    const animation = get().animation

    if (animation === name) return

    set({ animation: name, animationInProgress: true })

    if (collection && activeNoun) {
      const lilsAnimations = animationClass(collection)

      const func = await lilsAnimations
        .map(activeNoun.glasses)
        .find((a) => a.name === name)?.animateNoun

      if (func) {
        setTimeout(() => {
          func(activeNoun).then((src) => {
            set({ animatedNoun: src, animationInProgress: false })
          })
        }, 10)
      } else {
        set({ animationInProgress: false })
        //TODO: show some error message
      }
    } else {
      set({ animationInProgress: false })
    }
  }
}))

export type { NounState }

export { useNounStore }
