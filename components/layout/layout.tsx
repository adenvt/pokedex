import { FC } from 'react'
import Navbar from './navbar'
import Head from 'next/head'
import favicon from '../../assets/image/poke-ball.png'

export const Layout: FC = ({ children }) => {
  return (
    <div className="w-full h-full min-h-screen bg-retro font-body text-retro-900">
      <Head>
        <title>Pokédex - Ade Novid</title>
        <meta name="description" content="Retro style Pokédex website, built with React and Next js" />
        <link rel="icon" type="image/png" href={favicon.src} />
      </Head>
      <Navbar />
      <main className="max-w-screen-lg p-3 mx-auto">
        {children}
      </main>
    </div>
  )
}

export default Layout
