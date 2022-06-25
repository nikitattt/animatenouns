import clsx from 'clsx'

type NounPreviewProps = {
  sizeClasses: string
  animation: any
  animationActive?: boolean
  seed: any
}

const NounPreview = ({
  sizeClasses,
  animation,
  animationActive = true,
  seed
}: Readonly<NounPreviewProps>) => {
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

export default NounPreview
