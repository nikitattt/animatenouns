import clsx from 'clsx'
import { useNounStore } from '../../state/noun'

const downloadURL = (url: string) => {
  var link = document.createElement('a')
  link.download = 'animated lilnoun.gif' //TODO: decide name by collection type
  link.href = url
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

const SaveNoun = () => {
  const animatedNoun = useNounStore((state) => state.animatedNoun)

  return animatedNoun ? (
    <div
      onClick={() => downloadURL(animatedNoun)}
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
