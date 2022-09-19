import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { useNounStore } from '../../state/noun'
import { LilNounsAnimations } from '../../utils/animations/lilNouns'
import { nounImage } from '../../utils/nounImage'

type NounPreviewProps = {
  animationActive?: boolean
}

const NounPreview = ({
  animationActive = true
}: Readonly<NounPreviewProps>) => {
  const collection = useNounStore((state) => state.collection)
  const activeNoun = useNounStore((state) => state.activeNoun)

  const [animatedNoun, setAnimatedNoun] = useState<string | undefined>(
    undefined
  )
  const [animatedNounRequested, setAnimatedNounRequested] = useState(false)

  useEffect(() => {
    async function getAnimatedNoun() {
      console.log('NounPreview - checking for need to gen animated noun')
      if (collection && activeNoun && !animatedNoun && !animatedNounRequested) {
        //TODO: optimize calls to gen animated noun
        setAnimatedNounRequested(true)
        console.log('NounPreview - doing noun anim')
        //TODO: create class based on collection
        const lilsAnimations = new LilNounsAnimations()

        const src = await lilsAnimations.standardGlasses
          .find((a) => a.name === 'Simple Blinks')
          ?.animateNoun(activeNoun)

        setAnimatedNoun(src)
        setAnimatedNounRequested(false)
      }
    }

    getAnimatedNoun()
  }, [activeNoun])

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
