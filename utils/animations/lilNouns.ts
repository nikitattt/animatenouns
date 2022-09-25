import { Animation } from '../types/animation'
import { AnimationsIdMap } from '../types/animationsIdMap'
import { Seed } from '../types/seed'
import { ClassicNounAnimations } from './interfaces'
import { default as GifEncoder } from 'gifencoder'
import { createCanvas, loadImage, CanvasRenderingContext2D } from 'canvas'
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
  private encoder: GifEncoder
  private canvasCtx: CanvasRenderingContext2D

  getAnimatedNoun(): string {
    const gifBase64 = this.encoder.out.getData().toString('base64')
    return `data:image/gif;base64,${gifBase64}`
  }

  private drawRect(x: number, y: number, w: number, h: number, color: string) {
    this.canvasCtx.fillStyle = color
    this.canvasCtx.fillRect(x, y, w, h)
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
    this.drawRect(110, 150, 40, 60, '#ffffff')
    this.drawRect(200, 150, 40, 60, '#ffffff')

    this.encoder.setDelay(delay)
    this.encoder.addFrame(this.canvasCtx)
  }

  private drawEyesOpen(delay = 100, color: LilColorCode) {
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

  async drawNoun() {
    const { parts, background } = getLilNounData(this.seed)
    const svgBinary = buildSVG(parts, lilPalette, background)
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
    this.discoGlasses = []
    this.fullBlackGlasses = []
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
