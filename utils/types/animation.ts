import { Seed } from './seed'

export type Animation = {
  name: string
  animateNoun: (seed: Seed) => Promise<string>
}
