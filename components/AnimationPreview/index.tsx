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
      className="aspect-square w-full cursor-pointer"
    >
      <img
        className={clsx(
          'w-full h-full rounded-2xl',
          'border-0 hover:border-2 border-transparent hover:border-pink',
          animation === name && 'border-2 border-pink'
        )}
        src={previewImg}
      />
    </div>
  )
}

export default AnimationPreview
