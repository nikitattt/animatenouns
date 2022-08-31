import clsx from 'clsx'
import { useNounStore } from '../../state/noun'
import { nounImage } from '../../utils/nounImage'

type NounPreviewProps = {
  animationActive?: boolean
}

const NounPreview = ({
  animationActive = true
}: Readonly<NounPreviewProps>) => {
  const collection = useNounStore((state) => state.collection)
  const activeNoun = useNounStore((state) => state.activeNoun)

  let image = <></>
  if (collection && activeNoun) {
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
