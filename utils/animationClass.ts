import { ClassicNounAnimations } from './animations/interfaces'
import { LilNounsAnimations } from './animations/lilNouns'
import { NounsAnimations } from './animations/nouns'
import { Collections } from './types/collections'

export const animationClass = (
  collection: Collections
): ClassicNounAnimations => {
  if (collection === Collections.lilNouns) {
    return new LilNounsAnimations()
  } else {
    return new NounsAnimations()
  }
}
