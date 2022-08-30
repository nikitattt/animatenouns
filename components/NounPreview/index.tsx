import {
  ImageData as LilImageData,
  getNounData as getLilNounData
} from '@lilnouns/assets'
import { buildSVG } from '@nouns/sdk/dist/image/svg-builder'
import clsx from 'clsx'
import { useNounStore } from '../../state/noun'

const { palette } = LilImageData

type NounPreviewProps = {
  animationActive?: boolean
}

const NounPreview = ({
  animationActive = true
}: Readonly<NounPreviewProps>) => {
  const activeNoun = useNounStore((state) => state.activeNoun)

  let image = <></>
  if (activeNoun !== undefined) {
    const { parts, background } = getLilNounData(activeNoun)
    const svgBinary = buildSVG(parts, palette, background)
    const svgBase64 = Buffer.from(svgBinary).toString('base64')

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
  console.log(activeNoun)

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
