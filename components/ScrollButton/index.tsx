import clsx from 'clsx'
import { useState } from 'react'

export enum ScrollButtonAnimation {
  sm = 'sm',
  base = 'base',
  lg = 'lg',
  none = 'none'
}

export enum ScrollButtonDirection {
  left,
  right
}

const animationToClass: Record<ScrollButtonAnimation, string> = {
  [ScrollButtonAnimation.base]: 'animate-click',
  [ScrollButtonAnimation.sm]: 'animate-click-sm',
  [ScrollButtonAnimation.lg]: 'animate-click-lg',
  [ScrollButtonAnimation.none]: ''
}

type ScrollButtonProps = {
  onClick: () => void
  direction: ScrollButtonDirection
  animation?: ScrollButtonAnimation
  disabled?: boolean
}

const ScrollButton = ({
  onClick,
  direction,
  animation = ScrollButtonAnimation.lg,
  disabled = false
}: ScrollButtonProps) => {
  const [onClickAnimation, setOnClickAnimation] = useState(false)

  return (
    <button
      onClick={() => {
        onClick()
        setOnClickAnimation(true)
      }}
      disabled={disabled}
      onAnimationEnd={() => setOnClickAnimation(false)}
      className={clsx(
        'rounded-full h-8 w-8',
        'transition ease-in-out duration-150',
        onClickAnimation && animationToClass[animation],
        !disabled && 'bg-grey-light bg-opacity-0 hover:bg-opacity-20',
        disabled ? 'fill-grey-light' : 'fill-grey hover:fill-black-text'
      )}
    >
      {direction == ScrollButtonDirection.left ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 mx-auto my-auto"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
            clipRule="evenodd"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 mx-auto my-auto"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      )}
    </button>
  )
}

export default ScrollButton
