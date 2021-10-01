import Topnav from '../components/Topnav'
import { useState } from 'react'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  const [ cart, setCart ] = useState({})
  return (
    <>
      <Topnav />
      <Component {...pageProps} cart={cart} setCart={setCart} />
    </>
  )
}



export default MyApp
