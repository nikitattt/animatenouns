import {
  ImageData as LilImageData,
  getNounData as getLilNounData
} from '@lilnouns/assets'
import { ImageData, getNounData } from '@nouns/assets'
import { buildSVG } from '@nouns/sdk/dist/image/svg-builder'
import clsx from 'clsx'
import { Collections, useNounStore } from '../../state/noun'

const lilPalette = LilImageData.palette
const palette = ImageData.palette

type NounPreviewProps = {
  animationActive?: boolean
}

const NounPreview = ({
  animationActive = true
}: Readonly<NounPreviewProps>) => {
  const collection = useNounStore((state) => state.collection)
  const activeNoun = useNounStore((state) => state.activeNoun)

  let image = <></>
  if (activeNoun !== undefined) {
    let svgBase64

    if (collection === Collections.lilNouns) {
      const { parts, background } = getLilNounData(activeNoun)
      const svgBinary = buildSVG(parts, lilPalette, background)
      svgBase64 = Buffer.from(svgBinary).toString('base64')
    } else {
      const { parts, background } = getNounData(activeNoun)
      const svgBinary = buildSVG(parts, palette, background)
      svgBase64 = Buffer.from(svgBinary).toString('base64')
    }

    image = (
      <img
        className="w-full h-full rounded-2xl"
        src={`data:image/svg+xml;base64,${svgBase64}`}
      />
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
