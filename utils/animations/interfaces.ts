import { Animation } from '../types/animation'

export interface ClassicNounAnimations {
  /*
   * Animations that can be applied to most "classic" and common
   * glasses with white then black eyes
   */
  standardGlasses: Animation[]
  /*
   * Animations that can be applied to disco (black-rgb) type glasses
   */
  discoGlasses: Animation[]
  /*
   * Animations that can be applied to fullBlack type glasses
   * (Black frame, black eyes and small white "glare")
   */
  fullBlackGlasses: Animation[]
  /*
   * Animations that can be applied to black type glasses
   * (Black frame, white then black eyes)
   */
  blackGlasses: Animation[]
  /*
   * Animations that can be applied to red eye type glasses
   * (Black frame, white then red eyes)
   */
  redEyesGlasses: Animation[]
  mappings: Record<string, Array<any>>
}
