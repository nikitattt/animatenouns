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

  drawEyesSemiClosed(delay = 100) {
    this.drawRect(110, 150, 40, 60, '#ffffff')
    this.drawRect(200, 150, 40, 60, '#ffffff')

    this.drawRect(110, 165, 40, 30, '#000000')
    this.drawRect(200, 165, 40, 30, '#000000')

    this.encoder.setDelay(delay)
    this.encoder.addFrame(this.canvasCtx)
  }

  drawEyesClosed(delay = 100) {
    this.drawRect(110, 150, 40, 60, '#ffffff')
    this.drawRect(200, 150, 40, 60, '#ffffff')

    this.encoder.setDelay(delay)
    this.encoder.addFrame(this.canvasCtx)
  }

  drawEyesOpen(delay = 100) {
    this.drawRect(90, 150, 20, 60, '#ffffff')
    this.drawRect(180, 150, 40, 60, '#ffffff')

    this.drawRect(110, 150, 40, 60, '#000000')
    this.drawRect(200, 150, 40, 60, '#000000')

    this.encoder.setDelay(delay)
    this.encoder.addFrame(this.canvasCtx)
  }

  drawEyesLeft(delay = 100) {
    this.drawRect(110, 150, 40, 60, '#ffffff')
    this.drawRect(200, 150, 40, 60, '#ffffff')

    this.drawRect(90, 150, 40, 60, '#000000')
    this.drawRect(180, 150, 40, 60, '#000000')

    this.encoder.setDelay(delay)
    this.encoder.addFrame(this.canvasCtx)
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

          await lil.drawNoun()

          lil.drawEyesSemiClosed(75)
          lil.drawEyesClosed(50)
          lil.drawEyesSemiClosed(75)

          lil.drawEyesOpen(350)

          lil.drawEyesSemiClosed(75)
          lil.drawEyesClosed(50)
          lil.drawEyesSemiClosed(75)

          lil.drawEyesOpen(2000)

          const animatedNoun = lil.getAnimatedNoun()

          return animatedNoun
        }
      },
      {
        name: 'Left And Blinks',
        previewImg: '/previews/lil-nouns/left-and-blinks.gif',
        async animateNoun(seed) {
          const lil = new LilNounsAnimationsImpl(seed)

          await lil.drawNoun()

          lil.drawEyesLeft(350)

          lil.drawEyesOpen(500)

          lil.drawEyesSemiClosed(75)
          lil.drawEyesClosed(50)
          lil.drawEyesSemiClosed(75)

          lil.drawEyesOpen(350)

          lil.drawEyesSemiClosed(75)
          lil.drawEyesClosed(50)
          lil.drawEyesSemiClosed(75)

          lil.drawEyesOpen(2000)

          const animatedNoun = lil.getAnimatedNoun()

          return animatedNoun
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
