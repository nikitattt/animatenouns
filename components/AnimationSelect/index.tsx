import { useRef } from 'react'
import AnimatedNoun from '../AnimatedNoun'
import ScrollButton, { ScrollButtonDirection } from '../ScrollButton'

const AnimationSelect = ({ animations }: { animations: any[] }) => {
  const listRef = useRef<HTMLDivElement>(null)

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
      <div ref={listRef} className="my-6 flex flex-row gap-8 overflow-scroll">
        {animations.map(function (animation, place) {
          return (
            <div key={place}>
              <AnimatedNoun
                sizeClasses="h-40 w-40"
                animation={animation}
                animationActive={false}
                seed={{}}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default AnimationSelect
