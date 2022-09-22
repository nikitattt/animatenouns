import clsx from 'clsx'
import { useNounStore } from '../../state/noun'

type AnimationPreviewProps = {
  name: string
  previewImg: string
  animationActive?: boolean
}

const AnimationPreview = ({
  name,
  previewImg,
  animationActive = true
}: Readonly<AnimationPreviewProps>) => {
  const animation = useNounStore((state) => state.animation)
  const setAnimation = useNounStore((state) => state.setAnimation)

  return (
    <div
      onClick={() => setAnimation(name)}
      className={clsx(
        'flex items-center justify-center bg-grey-light bg-opacity-20',
        'border-0 hover:border-2 border-pink cursor-pointer',
        'rounded-2xl aspect-square w-full',
        animation === name && 'border-2 border-pink'
      )}
    >
      {/* TODO: show animated image 
      <img className="w-full h-full rounded-2xl" src={previewImg} /> */}
    </div>
  )
}

export default AnimationPreview
