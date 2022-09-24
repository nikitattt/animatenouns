import { LilNounsAnimations } from '../utils/animations/lilNouns'
import { Collections } from '../utils/types/collections'
import { Seed } from '../utils/types/seed'

addEventListener(
  'message',
  async (event: MessageEvent<[Collections, Seed, string]>) => {
    const [collection, noun, animation] = event.data

    let cls
    if (collection === Collections.lilNouns) {
      cls = new LilNounsAnimations()
    } else {
      //TODO: change to noun class
      cls = new LilNounsAnimations()
    }

    const animations = await cls.map(noun.glasses)

    const src = await animations
      .find((a) => a.name === animation)
      ?.animateNoun(noun)

    postMessage(src)
  }
)
