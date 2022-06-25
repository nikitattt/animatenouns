import AnimatedNoun from '../AnimatedNoun'
import AnimationSelect from '../AnimationSelect'
import NounLoadOrCreate from '../NounLoadOrCreate'

const AnimateNoun = () => {
  const animations = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
  return (
    <div className="flex flex-col">
      <div className="flex flex-row mx-auto">
        <AnimatedNoun sizeClasses="h-60 w-60" animation={{}} seed={{}} />
        <NounLoadOrCreate />
      </div>
      <AnimationSelect animations={animations} />
    </div>
  )
}

export default AnimateNoun
