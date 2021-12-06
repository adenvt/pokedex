import { useRouter } from 'next/router'
import Link from 'next/link'
import { FC } from 'react'
import classNames from 'classnames'

export const Navbar: FC = () => {
  return (
    <div className="p-3 text-3xl border-b-4 border-pokedex-800 bg-pokedex">
      <div className="flex items-center justify-between">
        <h1 className="text-pokedex-800">Pokédex</h1>
        <div className="flex flex-shrink-0 gap-2 px-3">
          <div className="w-5 h-5 bg-red-500 border-2 rounded-full border-pokedex-700"></div>
          <div className="w-5 h-5 bg-yellow-500 border-2 rounded-full border-pokedex-700"></div>
          <div className="w-5 h-5 bg-green-500 border-2 rounded-full border-pokedex-700"></div>
        </div>
      </div>
    </div>
  )
}

export const FilterNavbar: FC = () => {
  const router = useRouter()

  return (
    <div className="flex items-center gap-2">
      <Link href="/" passHref>
        <a className={classNames('hover:underline', { 'border-b border-retro-800': router.pathname === '/' })}>
          All
        </a>
      </Link>
      <span>-</span>
      <Link href="/owned" passHref>
        <a className={classNames('hover:underline', { 'border-b border-retro-800': router.pathname === '/owned' })}>
          Owned
        </a>
      </Link>
    </div>
  )
}

export default Navbar
