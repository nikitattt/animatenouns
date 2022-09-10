import { Animation } from '../types/animation'
import { AnimationsIdMap } from '../types/animationsIdMap'

export interface ClassicNounAnimations {
  /*
   * Animations that can be applied to most "classic" and common
   * glasses with white then black eyes
   */
  readonly standardGlasses: Animation[]
  /*
   * Animations that can be applied to disco (black-rgb) type glasses
   */
  readonly discoGlasses: Animation[]
  /*
   * Animations that can be applied to fullBlack type glasses
   * (Black frame, black eyes and small white "glare")
   */
  readonly fullBlackGlasses: Animation[]
  /*
   * Animations that can be applied to black type glasses
   * (Black frame, white then black eyes)
   */
  readonly blackGlasses: Animation[]
  /*
   * Animations that can be applied to red eye type glasses
   * (Black frame, white then red eyes)
   */
  readonly redEyesGlasses: Animation[]
  readonly animationsIdMaps: AnimationsIdMap[]
  map: (glasses: number) => Animation[]
}
