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
        <p className="text-grey font-display font-thin text-2xl tracking-wide text-center">
          Coming
          <br />
          soon!
        </p>
      )}
    </div>
  )
}

export default NounPreview
