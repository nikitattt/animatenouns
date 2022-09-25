import { useNounStore } from '../../state/noun'

const ProgressOverlay = () => {
  const animationInProgress = useNounStore((state) => state.animationInProgress)

  return animationInProgress ? (
    <div className="fixed left-0 top-0 right-0 bottom-0 bg-grey bg-opacity-70 backdrop-blur-sm">
      <div className="flex h-screen">
        <div className="m-auto -pt-8 text-center text-white">
          <div className="text-5xl font-bold font-display leading-10 max-w-md">
            We are animating your noun now
          </div>
          <div className="mt-12 text-xl max-w-md">
            <div>
              We use some computational magic for this, but the whole process
              might take up to a minute
            </div>
            <div className="mt-8">
              Just stay with us
              <br />
              ⌐◨-◨
            </div>
          </div>
        </div>
        <div className="fixed bottom-2 left-0 right-0">
          <div className="flex w-screen text-center">
            <div className="mx-auto text-red text-xl max-w-md">
              ! Do not close the page if your browser proposes so
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
