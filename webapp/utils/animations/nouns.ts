import { Animation } from '../types/animation'
import { AnimationsIdMap } from '../types/animationsIdMap'
import { Seed } from '../types/seed'
import { ClassicNounAnimations } from './interfaces'
import { default as GifEncoder } from 'gifencoder'
import { createCanvas, loadImage, CanvasRenderingContext2D } from 'canvas'
import { ImageData, getNounData } from '@nouns/assets'
import { buildSVG } from '@nouns/sdk/dist/image/svg-builder'

const palette = ImageData.palette

enum ColorCode {
  classic,
  red
}

class NounsAnimationsImpl {
  readonly width = 320
  readonly height = 320

  private seed: Seed
  private encoder: GifEncoder
  private canvasCtx: CanvasRenderingContext2D

  getAnimatedNoun(): string {
    this.encoder.finish()

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

  private drawEyesSemiClosed(delay = 100, color: ColorCode) {
    let colorOne
    let colorTwo

    switch (color) {
      case ColorCode.classic:
        colorOne = '#ffffff'
        colorTwo = '#000000'
        break
      case ColorCode.red:
        colorOne = '#ffffff'
        colorTwo = '#ff0c0e'
        break
    }

    this.drawRect(130, 120, 20, 40, colorOne)
    this.drawRect(200, 120, 20, 40, colorOne)

    this.drawRect(130, 130, 20, 20, colorTwo)
    this.drawRect(200, 130, 20, 20, colorTwo)

    this.encoder.setDelay(delay)
    this.encoder.addFrame(this.canvasCtx)
  }

  private drawEyesClosed(delay = 100) {
    this.drawRect(130, 120, 20, 40, '#ffffff')
    this.drawRect(200, 120, 20, 40, '#ffffff')

    this.encoder.setDelay(delay)
    this.encoder.addFrame(this.canvasCtx)
  }

  private drawEyesOpen(delay = 100, color: ColorCode) {
    let colorOne
    let colorTwo

    switch (color) {
      case ColorCode.classic:
        colorOne = '#ffffff'
        colorTwo = '#000000'
        break
      case ColorCode.red:
        colorOne = '#ffffff'
        colorTwo = '#ff0c0e'
        break
    }

    this.drawRect(110, 120, 20, 40, colorOne)
    this.drawRect(180, 120, 20, 40, colorOne)

    this.drawRect(130, 120, 20, 40, colorTwo)
    this.drawRect(200, 120, 20, 40, colorTwo)

    this.encoder.setDelay(delay)
    this.encoder.addFrame(this.canvasCtx)
  }

  private drawEyesLeft(delay = 100, color: ColorCode) {
    let colorOne
    let colorTwo

    switch (color) {
      case ColorCode.classic:
        colorOne = '#ffffff'
        colorTwo = '#000000'
        break
      case ColorCode.red:
        colorOne = '#ffffff'
        colorTwo = '#ff0c0e'
        break
    }

    this.drawRect(110, 120, 20, 40, colorTwo)
    this.drawRect(180, 120, 20, 40, colorTwo)

    this.drawRect(130, 120, 20, 40, colorOne)
    this.drawRect(200, 120, 20, 40, colorOne)

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
    this.drawRect(110, 120, 40, 40, '#000000')
    this.drawRect(180, 120, 40, 40, '#000000')

    this.drawRect(x1, y1, 10, 20, '#ffffff')
    this.drawRect(x2, y2, 10, 20, '#ffffff')

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
    this.drawRect(110, 120, 40, 40, '#000000')
    this.drawRect(180, 120, 40, 40, '#000000')

    this.drawRect(110, yBottom, 10, h, '#0ADC4D')
    this.drawRect(180, yBottom, 10, h, '#0ADC4D')

    this.drawRect(130, yTop, 10, h, '#FF0E0E')
    this.drawRect(200, yTop, 10, h, '#FF0E0E')

    this.drawRect(140, yBottom, 10, h, '#1929F4')
    this.drawRect(210, yBottom, 10, h, '#1929F4')

    this.encoder.setDelay(delay)
    this.encoder.addFrame(this.canvasCtx)
  }

  /*
   * Animation functions
   */
  async simpleBlinks(color: ColorCode) {
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

  async leftAndBlinks(color: ColorCode) {
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

  async leftLeft(color: ColorCode) {
    await this.drawNoun()

    this.drawEyesLeft(350, color)

    this.drawEyesOpen(750, color)

    this.drawEyesLeft(350, color)

    this.drawEyesOpen(2000, color)
  }

  async sideGlimpse() {
    await this.drawNoun()

    this.drawGlimpseRect(130, 120, 200, 120, 25)
    this.drawGlimpseRect(120, 120, 190, 120, 25)

    this.drawGlimpseRect(110, 120, 180, 120, 1000)

    this.drawGlimpseRect(120, 120, 190, 120, 75)
    this.drawGlimpseRect(130, 120, 200, 120, 65)
    this.drawGlimpseRect(140, 120, 210, 120, 2000)
  }

  async bits() {
    await this.drawNoun()

    this.drawBitRect(120, 140, 20, 25)
    this.drawBitRect(130, 150, 10, 50)

    this.drawBitRect(120, 140, 20, 50)
    this.drawBitRect(130, 150, 10, 350)

    this.drawBitRect(120, 140, 20, 50)
    this.drawBitRect(130, 150, 10, 50)

    this.drawBitRect(120, 140, 20, 50)
    this.drawBitRect(130, 150, 10, 50)

    this.drawBitRect(120, 140, 20, 50)
    this.drawBitRect(130, 150, 10, 50)

    this.drawBitRect(120, 140, 20, 50)
    this.drawBitRect(130, 150, 10, 350)

    this.drawBitRect(120, 140, 20, 50)
    this.drawBitRect(130, 150, 10, 50)

    this.drawBitRect(120, 140, 20, 50)
    this.drawBitRect(130, 150, 10, 150)

    this.drawBitRect(120, 140, 20, 50)
    this.drawBitRect(130, 150, 10, 50)

    this.drawBitRect(120, 140, 20, 50)
    this.drawBitRect(130, 150, 10, 50)

    this.drawBitRect(120, 140, 20, 50)
    this.drawBitRect(130, 150, 10, 50)

    this.drawBitRect(120, 140, 20, 50)
    this.drawBitRect(130, 150, 10, 350)

    this.drawBitRect(120, 140, 20, 50)
    this.drawBitRect(130, 150, 10, 50)

    this.drawBitRect(120, 140, 20, 25)

    this.drawBitRect(120, 140, 10, 2000)
  }

  async drawNoun() {
    const { parts, background } = getNounData(this.seed)
    const svgBinary = buildSVG(parts, palette, background)
    const svgBase64 = Buffer.from(svgBinary).toString('base64')

    const image = await loadImage(`data:image/svg+xml;base64,${svgBase64}`)

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

export class NounsAnimations implements ClassicNounAnimations {
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
        previewImg: '/previews/nouns/simple-blinks.gif',
        async animateNoun(seed) {
          const lil = new NounsAnimationsImpl(seed)
          await lil.simpleBlinks(ColorCode.classic)
          return lil.getAnimatedNoun()
        }
      },
      {
        name: 'Left And Blinks',
        previewImg: '/previews/nouns/left-and-blinks.gif',
        async animateNoun(seed) {
          const lil = new NounsAnimationsImpl(seed)
          await lil.leftAndBlinks(ColorCode.classic)
          return lil.getAnimatedNoun()
        }
      },
      {
        name: 'Left-Left',
        previewImg: '/previews/nouns/left-left.gif',
        async animateNoun(seed) {
          const lil = new NounsAnimationsImpl(seed)
          await lil.leftLeft(ColorCode.classic)
          return lil.getAnimatedNoun()
        }
      }
    ]
    this.discoGlasses = [
      {
        name: 'Bits',
        previewImg: '/previews/nouns/bits.gif',
        async animateNoun(seed) {
          const lil = new NounsAnimationsImpl(seed)
          await lil.bits()
          return lil.getAnimatedNoun()
        }
      }
    ]
    this.fullBlackGlasses = [
      {
        name: 'Side Glimpse',
        previewImg: '/previews/nouns/side-glimpse.gif',
        async animateNoun(seed) {
          const lil = new NounsAnimationsImpl(seed)
          await lil.sideGlimpse()
          return lil.getAnimatedNoun()
        }
      }
    ]
    this.blackGlasses = [
      {
        name: 'Simple Blinks',
        previewImg: '/previews/nouns/simple-blinks-black.gif',
        async animateNoun(seed) {
          const lil = new NounsAnimationsImpl(seed)
          await lil.simpleBlinks(ColorCode.classic)
          return lil.getAnimatedNoun()
        }
      },
      {
        name: 'Left-Left',
        previewImg: '/previews/nouns/left-left-black.gif',
        async animateNoun(seed) {
          const lil = new NounsAnimationsImpl(seed)
          await lil.leftLeft(ColorCode.classic)
          return lil.getAnimatedNoun()
        }
      }
    ]
    this.redEyesGlasses = [
      {
        name: 'Simple Blinks',
        previewImg: '/previews/nouns/simple-blinks-red.gif',
        async animateNoun(seed) {
          const lil = new NounsAnimationsImpl(seed)
          await lil.simpleBlinks(ColorCode.red)
          return lil.getAnimatedNoun()
        }
      },
      {
        name: 'Left And Blinks',
        previewImg: '/previews/nouns/left-and-blinks-red.gif',
        async animateNoun(seed) {
          const lil = new NounsAnimationsImpl(seed)
          await lil.leftAndBlinks(ColorCode.red)
          return lil.getAnimatedNoun()
        }
      },
      {
        name: 'Left-Left',
        previewImg: '/previews/nouns/left-left-red.gif',
        async animateNoun(seed) {
          const lil = new NounsAnimationsImpl(seed)
          await lil.leftLeft(ColorCode.red)
          return lil.getAnimatedNoun()
        }
      }
    ]

    this.animationsIdMaps = [
      {
        supportedId: '0,4,5,6,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22',
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
