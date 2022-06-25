import clsx from 'clsx'

type AnimatedNounProps = {
  sizeClasses: string
  animation: any
  animationActive?: boolean
  seed: any
}

const AnimatedNoun = ({
  sizeClasses,
  animation,
  animationActive = true,
  seed
}: Readonly<AnimatedNounProps>) => {
  return (
    <div
      className={clsx(
        sizeClasses,
        'bg-grey-light bg-opacity-20 rounded-2xl flex items-center justify-center'
      )}
    >
      {animationActive && (
        <p className="text-grey font-extralight text-xl text-center">
          Coming
          <br />
          soon!
        </p>
      )}
    </div>
  )
}

export default AnimatedNoun
