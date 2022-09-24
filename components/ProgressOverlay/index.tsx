import { useNounStore } from '../../state/noun'

const ProgressOverlay = () => {
  const animationInProgress = useNounStore((state) => state.animationInProgress)

  return animationInProgress ? (
    <div className="fixed left-0 top-0 right-0 bottom-0 bg-grey bg-opacity-70 backdrop-blur-sm">
      <div className="flex h-screen">
        <div className="m-auto text-center text-white">
          <div className="text-5xl font-bold font-display leading-10 max-w-md">
            We are animating your noun now
          </div>
          <div className="mt-12 text-xl max-w-md">
            <div>
              We use some computational magic for this, but the whole process
              might take up to 30 seconds
            </div>
            <div className="mt-8">
              Just stay with us
              <br />
              ⌐◨-◨
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <></>
  )
}

export default ProgressOverlay
