import { FC } from 'react'
import Navbar from './navbar'

export const Layout: FC = ({ children }) => {
  return (
    <div className="w-full h-full min-h-screen bg-retro font-body text-retro-900">
      <Navbar />
      <main className="p-3">
        {children}
      </main>
    </div>
  )
}

export default Layout
