import clsx from 'clsx'
import { useNounStore } from '../../state/noun'
import {
  ImageData as LilImageData,
  getNounData as getLilNounData
} from '@lilnounsdao/assets'
import { ImageData, getNounData } from '@nouns/assets'
import { buildSVG } from '@nouns/sdk/dist/image/svg-builder'
import { Collections } from '../../utils/types/collections'
import { instanceOfSeed, Seed, UploadedNoun } from '../../utils/types/types'

const lilPalette = LilImageData.palette
const palette = ImageData.palette

export const nounImage = (collection: Collections, noun: Seed | UploadedNoun): string => {
  if (instanceOfSeed(noun)) {
    let binary

    if (collection === Collections.lilNouns) {
      const { parts, background } = getLilNounData(noun)
      binary = buildSVG(parts, lilPalette, background)
    } else {
      const { parts, background } = getNounData(noun)
      binary = buildSVG(parts, palette, background)
    }

    const svgBase64 = Buffer.from(binary).toString('base64')

    return `data:image/svg+xml;base64,${svgBase64}`
  } else {
    const pngBase64 = noun.image.toString('base64')

    return `data:image/png+xml;base64,${pngBase64}`
  }
}

type NounPreviewProps = {
  animationActive?: boolean
}

const NounPreview = ({
  animationActive = true
}: Readonly<NounPreviewProps>) => {
  const collection = useNounStore((state) => state.collection)
  const activeNoun = useNounStore((state) => state.activeNoun)
  const animatedNoun = useNounStore((state) => state.animatedNoun)

  let image = <></>
  if (animatedNoun) {
    image = <img className="w-full h-full rounded-2xl" src={animatedNoun} />
  } else if (collection && activeNoun) {
    const src = nounImage(collection, activeNoun)

    image = <img className="w-full h-full rounded-2xl" src={src} />
  } else if (collection && !activeNoun) {
    image = (
      <p className="text-grey font-display font-thin text-2xl tracking-wide text-center">
        Load your noun
      </p>
    )
  } else {
    image = (
      <p className="text-grey font-display font-thin text-2xl tracking-wide text-center">
        Get started
        <br />
        on the right
      </p>
    )
  }

  return (
    <div
      className={clsx(
        'flex items-center justify-center bg-grey-light bg-opacity-20',
        'rounded-2xl aspect-square w-full'
      )}
    >
      {animationActive && image}
    </div>
  )
}

export default NounPreview
