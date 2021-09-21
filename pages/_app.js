import Topnav from '../components/Topnav'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Topnav />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
