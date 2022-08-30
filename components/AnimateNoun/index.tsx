import { useNounStore } from '../../state/noun'
import AnimationSelect from '../AnimationSelect'
import NounPreview from '../NounPreview'
import NounSelectAndActions from '../NounSelectAndActions'

const AnimateNoun = () => {
  const animations = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
  const activeNoun = useNounStore((state) => state.activeNoun)
  console.log(activeNoun)
  return (
    <div className="flex flex-col">
      <div className="flex flex-col lg:flex-row mx-auto gap-4 w-full justify-center">
        {/* <div className="-rotate-90 -mr-52">
          <p className="font-display text-grey-light text-4xl">Your Noun</p>
        </div> */}
        <div className="w-full lg:w-96">
          <NounPreview animation={{}} seed={{}} />
        </div>
        <div className="w-full lg:w-96">
          <NounSelectAndActions />
        </div>
      </div>
      <AnimationSelect animations={animations} />
    </div>
  )
}

export default AnimateNoun
