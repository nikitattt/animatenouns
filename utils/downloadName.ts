import { Collections } from './types/collections'

export const downloadName = (collection: Collections) => {
  if (collection === Collections.lilNouns) {
    return 'animated lilnoun.gif'
  } else {
    return 'animated noun.gif'
  }
}
