import { Collections, Seed } from '../state/noun'
import {
  ImageData as LilImageData,
  getNounData as getLilNounData
} from '@lilnouns/assets'
import { ImageData, getNounData } from '@nouns/assets'
import { buildSVG } from '@nouns/sdk/dist/image/svg-builder'

const lilPalette = LilImageData.palette
const palette = ImageData.palette

export const nounImage = (collection: Collections, seed: Seed): string => {
  let svgBase64

  if (collection === Collections.lilNouns) {
    const { parts, background } = getLilNounData(seed)
    const svgBinary = buildSVG(parts, lilPalette, background)
    svgBase64 = Buffer.from(svgBinary).toString('base64')
  } else {
    const { parts, background } = getNounData(seed)
    const svgBinary = buildSVG(parts, palette, background)
    svgBase64 = Buffer.from(svgBinary).toString('base64')
  }

  return `data:image/svg+xml;base64,${svgBase64}`
}
