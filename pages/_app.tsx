import 'tailwindcss/tailwind.css'
import 'react-toastify/dist/ReactToastify.css'
import '../styles/toastify-custom.css'
import type { AppProps } from 'next/app'
import Layout from '../components/layout/layout'
import { useApollo } from '../api'
import { ApolloProvider } from '@apollo/client'
import ReactFontLoader from 'react-font-loader'
import { ToastContainer } from 'react-toastify'

function MyApp ({ Component, pageProps }: AppProps) {
  const client = useApollo(pageProps)

  return (
    <ApolloProvider client={client}>
      <ReactFontLoader url="https://fonts.googleapis.com/css2?family=Flow+Block&family=VT323&display=swap" />

      <Layout>
        <ToastContainer />
        <Component {...pageProps} />
      </Layout>
    </ApolloProvider>
  )
}

export default MyApp
