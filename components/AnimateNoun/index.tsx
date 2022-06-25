import AnimatedNoun, { AnimatedNounSize } from '../AnimatedNoun'
import AnimationSelect from '../AnimationSelect'

const AnimateNoun = () => {
  return (
    <div className="flex flex-column">
      <div>
        <AnimatedNoun size={AnimatedNounSize.small} animation={{}} seed={{}} />
      </div>
      <AnimationSelect animations={[]} />
    </div>
  )
}

export default AnimateNoun
