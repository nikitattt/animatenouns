import Image from 'next/image'

const NavBar = () => {
  return (
    <div className="flex flex-row justify-between items-center px-8 py-4">
      <div className="h-14 w-14 relative">
        <Image src="/icon.gif" layout="fill" />
      </div>
      <div className="flex flex-row items-center gap-4">
        <div></div>
      </div>
    </div>
  )
}

export default NavBar
