import AnimatedNoun, { AnimatedNounSize } from '../AnimatedNoun'
import ScrollButton, { ScrollButtonDirection } from '../ScrollButton'

const AnimationSelect = ({ animations }: { animations: any[] }) => {
  return (
    <div className="mt-20 flex flex-column">
      <div className="flex flex-row items-center gap-2">
        <p className="font-medium text-2xl">Select Animation</p>
        <div className="gap-1 pt-1">
          <ScrollButton
            onClick={() => {}}
            direction={ScrollButtonDirection.left}
          />
          <ScrollButton
            onClick={() => {}}
            direction={ScrollButtonDirection.right}
          />
        </div>
      </div>
      <div className="flex-row overflow-scroll">
        {animations.map(function (animation, place) {
          return (
            <div key={place} className="w-full rounded-2xl bg-grey-light">
              <AnimatedNoun
                size={AnimatedNounSize.small}
                animation={animation}
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
