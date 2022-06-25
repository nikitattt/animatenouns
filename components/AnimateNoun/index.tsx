import AnimationSelect from '../AnimationSelect'
import NounLoadOrCreate from '../NounLoadOrCreate'
import NounPreview from '../NounPreview'

const AnimateNoun = () => {
  const animations = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
  return (
    <div className="flex flex-col">
      <div className="flex flex-row mx-auto gap-4">
        <div className="w-96 h-96">
          <NounPreview animation={{}} seed={{}} />
        </div>
        <div className="w-96">
          <NounLoadOrCreate />
        </div>
      </div>
      <AnimationSelect animations={animations} />
    </div>
  )
}

export default AnimateNoun
