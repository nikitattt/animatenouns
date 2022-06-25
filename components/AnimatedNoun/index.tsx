export enum AnimatedNounSize {
  big,
  small
}

type AnimatedNounType = {
  size: AnimatedNounSize
  animation: any
  seed: any
}

const AnimatedNoun = ({
  size,
  animation,
  seed
}: Readonly<AnimatedNounType>) => {
  return (
    <div className="flex flex-column">
      {size == AnimatedNounSize.big ? <div></div> : <div></div>}
    </div>
  )
}

export default AnimatedNoun
