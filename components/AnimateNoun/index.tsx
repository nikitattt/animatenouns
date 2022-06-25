import AnimatedNoun, { AnimatedNounSize } from '../AnimatedNoun'
import AnimationSelect from '../AnimationSelect'
import NounLoadOrCreate from '../NounLoadOrCreate'

const AnimateNoun = () => {
  return (
    <div className="flex flex-col">
      <div className="flex flex-row mx-auto">
        <AnimatedNoun size={AnimatedNounSize.big} animation={{}} seed={{}} />
        <NounLoadOrCreate />
      </div>
      <AnimationSelect animations={[]} />
    </div>
  )
}

export default AnimateNoun
