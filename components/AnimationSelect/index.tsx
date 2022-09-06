import { useRef } from 'react'
import { useNounStore } from '../../state/noun'
import { ClassicNounAnimations } from '../../utils/animations/interfaces'
import { LilNounsAnimations } from '../../utils/animations/lilNouns'
import { Collections } from '../../utils/types/collections'
import NounPreview from '../NounPreview'
import ScrollButton, { ScrollButtonDirection } from '../ScrollButton'

const lilNounAnimations = new LilNounsAnimations()

const collectionToAnimation: Record<Collections, ClassicNounAnimations> = {
  [Collections.lilNouns]: lilNounAnimations,
  // TODO: change to nouns class
  [Collections.nouns]: lilNounAnimations
}

const AnimationSelect = () => {
  const collection = useNounStore((state) => state.collection)
  const activeNoun = useNounStore((state) => state.activeNoun)
  const listRef = useRef<HTMLDivElement>(null)

  let animations = undefined

  if (collection && activeNoun) {
    animations = collectionToAnimation[collection].map(activeNoun.glasses)
  }

  return (
    <div className="mt-20 flex flex-col">
      <div className="flex flex-row items-center gap-2">
        <p className="font-medium text-2xl">Select Animation</p>
        <div className="gap-1 pt-1">
          <ScrollButton
            onClick={() => {
              if (!!listRef.current) listRef.current.scrollLeft -= 192
            }}
            direction={ScrollButtonDirection.left}
          />
          <ScrollButton
            onClick={() => {
              if (!!listRef.current) listRef.current.scrollLeft += 192
            }}
            direction={ScrollButtonDirection.right}
          />
        </div>
      </div>
      <div
        ref={listRef}
        className="my-6 flex flex-row gap-8 overflow-scroll no-scrollbar"
      >
        {animations &&
          animations.map(function (animation, place) {
            return (
              <div key={place}>
                <div className="w-40 h-40">
                  <NounPreview animationActive={false} />
                </div>
                <div className="text-center text-grey mt-2">
                  {animation.name}
                </div>
              </div>
            )
          })}
      </div>
    </div>
  )
}

export default AnimationSelect
