import { Animation } from '../types/animation'
import { AnimationsIdMap } from '../types/animationsIdMap'
import { Seed } from '../types/seed'
import { ClassicNounAnimations } from './interfaces'
import { default as GifEncoder } from 'gifencoder'
import {
  createCanvas,
  loadImage,
  CanvasRenderingContext2D,
  Image
} from 'canvas'
import {
  ImageData as LilImageData,
  getNounData as getLilNounData
} from '@lilnouns/assets'
import { buildSVG } from '@nouns/sdk/dist/image/svg-builder'

const lilPalette = LilImageData.palette

enum LilColorCode {
  classic,
  red
}

class LilNounsAnimationsImpl {
  readonly width = 320
  readonly height = 320

  private seed: Seed
  private nounImage: Image | undefined
  private encoder: GifEncoder
  private canvasCtx: CanvasRenderingContext2D

  getAnimatedNoun(): string {
    const gifBase64 = this.encoder.out.getData().toString('base64')
    return `data:image/gif;base64,${gifBase64}`
  }

  /*
   * Utility functions
   */

  private drawRect(x: number, y: number, w: number, h: number, color: string) {
    this.canvasCtx.fillStyle = color
    this.canvasCtx.fillRect(x, y, w, h)
  }

  // TODO: better algo without this
  private drawNounImage() {
    if (this.nounImage) {
      this.canvasCtx.drawImage(this.nounImage, 0, 0)
    }
  }

  private drawEyesSemiClosed(delay = 100, color: LilColorCode) {
    let colorOne
    let colorTwo

    switch (color) {
      case LilColorCode.classic:
        colorOne = '#ffffff'
        colorTwo = '#000000'
        break
      case LilColorCode.red:
        colorOne = '#ffffff'
        colorTwo = '#ff0c0e'
        break
    }

    this.drawRect(110, 150, 40, 60, colorOne)
    this.drawRect(200, 150, 40, 60, colorOne)

    this.drawRect(110, 165, 40, 30, colorTwo)
    this.drawRect(200, 165, 40, 30, colorTwo)

    this.encoder.setDelay(delay)
    this.encoder.addFrame(this.canvasCtx)
  }

  private drawEyesClosed(delay = 100) {
    this.drawNounImage()

    this.drawRect(110, 150, 40, 60, '#ffffff')
    this.drawRect(200, 150, 40, 60, '#ffffff')

    this.encoder.setDelay(delay)
    this.encoder.addFrame(this.canvasCtx)
  }

  private drawEyesOpen(delay = 100, color: LilColorCode) {
    this.drawNounImage()

    let colorOne
    let colorTwo

    switch (color) {
      case LilColorCode.classic:
        colorOne = '#ffffff'
        colorTwo = '#000000'
        break
      case LilColorCode.red:
        colorOne = '#ffffff'
        colorTwo = '#ff0c0e'
        break
    }

    this.drawRect(90, 150, 20, 60, colorOne)
    this.drawRect(180, 150, 40, 60, colorOne)

    this.drawRect(110, 150, 40, 60, colorTwo)
    this.drawRect(200, 150, 40, 60, colorTwo)

    this.encoder.setDelay(delay)
    this.encoder.addFrame(this.canvasCtx)
  }

  private drawEyesLeft(delay = 100, color: LilColorCode) {
    this.drawNounImage()

    let colorOne
    let colorTwo

    switch (color) {
      case LilColorCode.classic:
        colorOne = '#ffffff'
        colorTwo = '#000000'
        break
      case LilColorCode.red:
        colorOne = '#ffffff'
        colorTwo = '#ff0c0e'
        break
    }

    this.drawRect(110, 150, 40, 60, colorOne)
    this.drawRect(200, 150, 40, 60, colorOne)

    this.drawRect(90, 150, 40, 60, colorTwo)
    this.drawRect(180, 150, 40, 60, colorTwo)

    this.encoder.setDelay(delay)
    this.encoder.addFrame(this.canvasCtx)
  }

  /*
   * To be used for FullBlack glasses animations
   */
  private drawGlimpseRect(
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    delay = 100
  ) {
    this.drawNounImage()

    this.drawRect(90, 150, 60, 60, '#000000')
    this.drawRect(180, 150, 60, 60, '#000000')

    this.drawRect(x1, y1, 10, 30, '#ffffff')
    this.drawRect(x2, y2, 10, 30, '#ffffff')

    this.encoder.setDelay(delay)
    this.encoder.addFrame(this.canvasCtx)
  }

  /*
   * To be used for Disco glasses animations
   */
  private drawBitRect(
    yTop: number,
    yBottom: number,
    h: number = 10,
    delay = 100
  ) {
    this.drawNounImage()

    this.drawRect(90, 150, 60, 60, '#000000')
    this.drawRect(180, 150, 60, 60, '#000000')

    this.drawRect(90, yBottom, 10, h, '#0ADC4D')
    this.drawRect(180, yBottom, 10, h, '#0ADC4D')

    this.drawRect(130, yTop, 10, h, '#FF0E0E')
    this.drawRect(220, yTop, 10, h, '#FF0E0E')

    this.drawRect(140, yBottom, 10, h, '#1929F4')
    this.drawRect(230, yBottom, 10, h, '#1929F4')

    this.encoder.setDelay(delay)
    this.encoder.addFrame(this.canvasCtx)
  }

  /*
   * Animation functions
   */

  async simpleBlinks(color: LilColorCode) {
    await this.drawNoun()

    this.drawEyesSemiClosed(75, color)
    this.drawEyesClosed(50)
    this.drawEyesSemiClosed(75, color)

    this.drawEyesOpen(350, color)

    this.drawEyesSemiClosed(75, color)
    this.drawEyesClosed(50)
    this.drawEyesSemiClosed(75, color)

    this.drawEyesOpen(2000, color)
  }

  async leftAndBlinks(color: LilColorCode) {
    await this.drawNoun()

    this.drawEyesLeft(350, color)

    this.drawEyesOpen(500, color)

    this.drawEyesSemiClosed(75, color)
    this.drawEyesClosed(50)
    this.drawEyesSemiClosed(75, color)

    this.drawEyesOpen(350, color)

    this.drawEyesSemiClosed(75, color)
    this.drawEyesClosed(50)
    this.drawEyesSemiClosed(75, color)

    this.drawEyesOpen(2000, color)
  }

  async leftLeft(color: LilColorCode) {
    await this.drawNoun()

    this.drawEyesLeft(350, color)

    this.drawEyesOpen(750, color)

    this.drawEyesLeft(350, color)

    this.drawEyesOpen(2000, color)
  }

  async sideGlimpse() {
    await this.drawNoun()

    this.drawGlimpseRect(130, 150, 220, 150, 25)
    this.drawGlimpseRect(120, 150, 210, 150, 25)
    this.drawGlimpseRect(110, 150, 200, 150, 25)
    this.drawGlimpseRect(100, 150, 190, 150, 25)

    this.drawGlimpseRect(90, 150, 180, 150, 1000)

    this.drawGlimpseRect(100, 150, 190, 150, 75)
    this.drawGlimpseRect(110, 150, 200, 150, 65)
    this.drawGlimpseRect(120, 150, 210, 150, 55)
    this.drawGlimpseRect(130, 150, 220, 150, 45)

    this.drawGlimpseRect(140, 150, 230, 150, 2000)
  }

  async bits() {
    await this.drawNoun()

    this.drawBitRect(150, 180, 30, 25)
    this.drawBitRect(170, 200, 10, 50)

    this.drawBitRect(150, 180, 30, 50)
    this.drawBitRect(170, 200, 10, 350)

    this.drawBitRect(150, 180, 30, 50)
    this.drawBitRect(170, 200, 10, 50)

    this.drawBitRect(150, 180, 30, 50)
    this.drawBitRect(170, 200, 10, 50)

    this.drawBitRect(150, 180, 30, 50)
    this.drawBitRect(170, 200, 10, 50)

    this.drawBitRect(150, 180, 30, 50)
    this.drawBitRect(170, 200, 10, 350)

    this.drawBitRect(150, 180, 30, 50)
    this.drawBitRect(170, 200, 10, 50)

    this.drawBitRect(150, 180, 30, 50)
    this.drawBitRect(170, 200, 10, 150)

    this.drawBitRect(150, 180, 30, 50)
    this.drawBitRect(170, 200, 10, 50)

    this.drawBitRect(150, 180, 30, 50)
    this.drawBitRect(170, 200, 10, 50)

    this.drawBitRect(150, 180, 30, 50)
    this.drawBitRect(170, 200, 10, 50)

    this.drawBitRect(150, 180, 30, 50)
    this.drawBitRect(170, 200, 10, 350)

    this.drawBitRect(150, 180, 30, 50)
    this.drawBitRect(170, 200, 10, 50)

    this.drawBitRect(150, 180, 30, 25)

    this.drawBitRect(150, 180, 10, 2000)
  }

  async drawNoun() {
    const { parts, background } = getLilNounData(this.seed)
    const svgBinary = buildSVG(parts, lilPalette, background)
    const svgBase64 = Buffer.from(svgBinary).toString('base64')

    const image = await loadImage(`data:image/svg+xml;base64,${svgBase64}`)

    this.nounImage = image

    this.canvasCtx.drawImage(image, 0, 0)

    this.encoder.setDelay(100)
    this.encoder.addFrame(this.canvasCtx)
  }

  constructor(seed: Seed) {
    this.seed = seed

    this.encoder = new GifEncoder(this.width, this.height)

    const canvas = createCanvas(this.width, this.height)
    this.canvasCtx = canvas.getContext('2d')

    this.encoder.start()
    this.encoder.setRepeat(0) // 0 for repeat, -1 for no-repeat
    this.encoder.setQuality(10)
  }
}

export class LilNounsAnimations implements ClassicNounAnimations {
  readonly standardGlasses: Animation[]
  readonly discoGlasses: Animation[]
  readonly fullBlackGlasses: Animation[]
  readonly blackGlasses: Animation[]
  readonly redEyesGlasses: Animation[]
  readonly animationsIdMaps: AnimationsIdMap[]

  constructor() {
    this.standardGlasses = [
      {
        name: 'Simple Blinks',
        previewImg: '/previews/lil-nouns/simple-blinks.gif',
        async animateNoun(seed) {
          const lil = new LilNounsAnimationsImpl(seed)
          await lil.simpleBlinks(LilColorCode.classic)
          return lil.getAnimatedNoun()
        }
      },
      {
        name: 'Left And Blinks',
        previewImg: '/previews/lil-nouns/left-and-blinks.gif',
        async animateNoun(seed) {
          const lil = new LilNounsAnimationsImpl(seed)
          await lil.leftAndBlinks(LilColorCode.classic)
          return lil.getAnimatedNoun()
        }
      },
      {
        name: 'Left-Left',
        previewImg: '/previews/lil-nouns/left-left.gif',
        async animateNoun(seed) {
          const lil = new LilNounsAnimationsImpl(seed)
          await lil.leftLeft(LilColorCode.classic)
          return lil.getAnimatedNoun()
        }
      }
    ]
    this.discoGlasses = [
      {
        name: 'Bits',
        previewImg: '/previews/lil-nouns/bits.gif',
        async animateNoun(seed) {
          const lil = new LilNounsAnimationsImpl(seed)
          await lil.bits()
          return lil.getAnimatedNoun()
        }
      }
    ]
    this.fullBlackGlasses = [
      {
        name: 'Side Glimpses',
        previewImg: '/previews/lil-nouns/side-glimpse.gif',
        async animateNoun(seed) {
          const lil = new LilNounsAnimationsImpl(seed)
          await lil.sideGlimpse()
          return lil.getAnimatedNoun()
        }
      }
    ]
    this.blackGlasses = [
      {
        name: 'Simple Blinks',
        previewImg: '/previews/lil-nouns/simple-blinks-black.gif',
        async animateNoun(seed) {
          const lil = new LilNounsAnimationsImpl(seed)
          await lil.simpleBlinks(LilColorCode.classic)
          return lil.getAnimatedNoun()
        }
      }
    ]
    this.redEyesGlasses = [
      {
        name: 'Simple Blinks',
        previewImg: '/previews/lil-nouns/simple-blinks-red.gif',
        async animateNoun(seed) {
          const lil = new LilNounsAnimationsImpl(seed)
          await lil.simpleBlinks(LilColorCode.red)
          return lil.getAnimatedNoun()
        }
      },
      {
        name: 'Left And Blinks',
        previewImg: '/previews/lil-nouns/left-and-blinks-red.gif',
        async animateNoun(seed) {
          const lil = new LilNounsAnimationsImpl(seed)
          await lil.leftAndBlinks(LilColorCode.red)
          return lil.getAnimatedNoun()
        }
      },
      {
        name: 'Left-Left',
        previewImg: '/previews/lil-nouns/left-left-red.gif',
        async animateNoun(seed) {
          const lil = new LilNounsAnimationsImpl(seed)
          await lil.leftLeft(LilColorCode.red)
          return lil.getAnimatedNoun()
        }
      }
    ]

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
