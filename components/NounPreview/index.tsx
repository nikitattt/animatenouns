import clsx from 'clsx'

type NounPreviewProps = {
  animation: any
  animationActive?: boolean
  seed: any
}

const NounPreview = ({
  animation,
  animationActive = true,
  seed
}: Readonly<NounPreviewProps>) => {
  return (
    <div
      className={clsx(
        'flex items-center justify-center bg-grey-light bg-opacity-20',
        'rounded-2xl aspect-square w-full'
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
