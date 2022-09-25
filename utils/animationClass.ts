import { ClassicNounAnimations } from './animations/interfaces'
import { LilNounsAnimations } from './animations/lilNouns'
import { Collections } from './types/collections'

export const animationClass = (
  collection: Collections
): ClassicNounAnimations => {
  if (collection === Collections.lilNouns) {
    return new LilNounsAnimations()
  } else {
    //TODO: change to noun class
    return new LilNounsAnimations()
  }
}
