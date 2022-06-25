import AnimatedNoun, { AnimatedNounSize } from '../AnimatedNoun'

const AnimationSelect = ({ animations }: { animations: any[] }) => {
  return (
    <div className="flex flex-column">
      <div className="flex flex-row">
        <p>Select Animation</p>
        <div>
          <button></button>
          <button></button>
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
