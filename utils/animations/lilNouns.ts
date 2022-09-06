import { Animation } from '../types/animation'
import { AnimationsIdMap } from '../types/animationsIdMap'
import { ClassicNounAnimations } from './interfaces'

export class LilNounsAnimations implements ClassicNounAnimations {
  animationsIdMaps: AnimationsIdMap[]
  standardGlasses: Animation[]
  discoGlasses: Animation[]
  fullBlackGlasses: Animation[]
  blackGlasses: Animation[]
  redEyesGlasses: Animation[]

  constructor() {
    this.standardGlasses = [
      {
        name: 'Simple Blinks',
        animateNoun(seed) {
          return ''
        }
      }
    ]
    this.discoGlasses = []
    this.fullBlackGlasses = []
    this.blackGlasses = []
    this.redEyesGlasses = []

    // TODO: need to add 8.8 art. Require npm package update
    this.animationsIdMaps = [
      {
        supportedId: '0,4,5,6,8,9,10,11,12,13,14,15,16,17,18,19,20',
        animations: this.standardGlasses
      },
      {
        supportedId: '1',
        animations: this.redEyesGlasses
      },
      {
        supportedId: '2',
        animations: this.discoGlasses
      },
      {
        supportedId: '3',
        animations: this.blackGlasses
      },
      {
        supportedId: '7',
        animations: this.fullBlackGlasses
      }
    ]
  }

  map(glasses: number): Animation[] {
    for (const a of this.animationsIdMaps) {
      if (a.supportedId.split(',').includes(String(glasses))) {
        return a.animations
      }
    }

    return []
  }
}
