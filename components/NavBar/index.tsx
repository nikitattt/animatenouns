import Link from 'next/link'

const NavBar = () => {
  return (
    <div className="flex flex-row justify-between items-center px-8 py-4">
      <div className="h-14 w-14 relative cursor-pointer">
        <Link href="/">
          <img src="/icon.gif" alt="Hip-rose noun glasses" />
        </Link>
      </div>
      <div className="flex flex-row items-center gap-8">
        <NavLink href="/for-artists" text="For Artists" />
        <NavLink href="/#bespoke" text="Bespoke" />
      </div>
    </div>
  )
}

const NavLink = ({ href, text }: { href: string; text: string }) => {
  return (
    <div className="cursor-pointer">
      <Link href={href}>
        <p className="text-grey font-medium">{text}</p>
      </Link>
    </div>
  )
}

export default NavBar
