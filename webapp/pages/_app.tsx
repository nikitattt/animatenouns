import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Script from 'next/script'

function MyApp({ Component, pageProps }: AppProps) {
  return <>
    <Component {...pageProps} />
    <Script src="https://adata.animatenouns.wtf/latest.js" />
    <noscript>
      {/* eslint-disable @next/next/no-img-element */}
      <img
        src="https://adata.animatenouns.wtf/noscript.gif"
        alt=""
        referrerPolicy="no-referrer-when-downgrade"
      />
    </noscript>
  </>
}

export default MyApp
