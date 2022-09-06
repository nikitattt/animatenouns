import { Animation } from '../types/animation'
import { ClassicNounAnimations } from './interfaces'

export class LilNounsAnimations implements ClassicNounAnimations {
  mappings: Record<string, Array<any>>
  standardGlasses: Animation[]
  discoGlasses: Animation[]
  fullBlackGlasses: Animation[]
  blackGlasses: Animation[]
  redEyesGlasses: Animation[]

  constructor() {
    this.standardGlasses = [
      //   {
      //     name: 'Simple Blinks',
      //     animateNoun(seed) {
      //       return ''
      //     }
      //   }
    ]
    this.discoGlasses = []
    this.fullBlackGlasses = []
    this.blackGlasses = []
    this.redEyesGlasses = []

    // TODO: need to add 8.8 art. Require npm package update
    this.mappings = {
      '0,4,5,6,8,9,10,11,12,13,14,15,16,17,18,19,20': this.standardGlasses,
      '1': this.redEyesGlasses,
      '3': this.blackGlasses,
      '2': this.discoGlasses,
      '7': this.fullBlackGlasses
    }
  }
}
