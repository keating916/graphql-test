import Topnav from '../components/Topnav'
import { useState } from 'react'
import { CookiesProvider, useCookies } from 'react-cookie'

import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  const [ cart, setCart ] = useState({})
  const [cookies, setCookie] = useCookies(["cart"]);
  return (
    <CookiesProvider>
      <Topnav />
      <Component {...pageProps} cart={cart} setCart={setCart} />
    </CookiesProvider>
  )
}



export default MyApp
