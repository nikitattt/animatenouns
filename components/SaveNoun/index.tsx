import clsx from 'clsx'
import { useNounStore } from '../../state/noun'
import { downloadName } from '../../utils/downloadName'

const downloadURL = (url: string, name: string) => {
  var link = document.createElement('a')
  link.download = name
  link.href = url
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

const SaveNoun = () => {
  const animatedNoun = useNounStore((state) => state.animatedNoun)
  const collection = useNounStore((state) => state.collection)

  return animatedNoun ? (
    <div
      onClick={() => {
        if (collection) {
          const name = downloadName(collection)
          downloadURL(animatedNoun, name)
        }
      }}
      className={clsx(
        'text-black font-display text-center border-2 border-black rounded-xl py-2 cursor-pointer',
        'hover:bg-black hover:text-white'
      )}
    >
      Download
    </div>
  ) : (
    <></>
  )
}

export default SaveNoun
