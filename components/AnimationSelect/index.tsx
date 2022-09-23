import { useRef } from 'react'
import { useNounStore } from '../../state/noun'
import { ClassicNounAnimations } from '../../utils/animations/interfaces'
import { LilNounsAnimations } from '../../utils/animations/lilNouns'
import { Collections } from '../../utils/types/collections'
import AnimationPreview from '../AnimationPreview'
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

  let listElements = <></>

  if (collection && activeNoun) {
    const animations = collectionToAnimation[collection].map(activeNoun.glasses)
    listElements = (
      <div>
        {animations.map(function (animation, place) {
          return (
            <div key={place}>
              <div className="w-40 h-40">
                <AnimationPreview
                  name={animation.name}
                  previewImg={animation.previewImg}
                />
              </div>
              <div className="mt-2 w-10/12 mx-auto">
                <div className="text-center text-grey text-sm">
                  {animation.name}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    )
  } else {
    listElements = (
      <div className="flex flex-row gap-8">
        <div className="flex justify-center w-40 h-40 bg-grey bg-opacity-10 rounded-2xl">
          <div className="self-center my-auto text-center text-grey font-display font-thin text-sm">
            Waiting
            <br />
            for a noun
          </div>
        </div>
        <div className="w-40 h-40 bg-grey bg-opacity-5 rounded-2xl" />
        <div className="w-40 h-40 bg-grey bg-opacity-[0.02] rounded-2xl" />
      </div>
    )
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
        {listElements}
      </div>
    </div>
  )
}

export default AnimationSelect
