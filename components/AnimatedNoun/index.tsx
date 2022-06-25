export enum AnimatedNounSize {
  big,
  small
}

type AnimatedNounProps = {
  size: AnimatedNounSize
  animation: any
  seed: any
}

const AnimatedNoun = ({
  size,
  animation,
  seed
}: Readonly<AnimatedNounProps>) => {
  return (
    <div className="flex flex-column">
      {size == AnimatedNounSize.big ? (
        <div className="h-48 w-48 bg-grey-light rounded-2xl">
          {/* <p className="text-grey font-light">Coming soon</p> */}
        </div>
      ) : (
        <div className="h-20 w-20 bg-grey-light rounded-2xl">
          {/* <p className="text-grey font-light">Coming soon</p> */}
        </div>
      )}
    </div>
  )
}

export default AnimatedNoun
