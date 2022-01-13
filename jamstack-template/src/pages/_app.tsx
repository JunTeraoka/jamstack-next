//_app.tsxは共通なので全てのページに反映させるものをここに書く
//ex) Header, Footerなど

import { AppProps } from 'next/app'
import Footer from '../components/footer'
import Header from '../components/header'
import '../../public/style.scss'


export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Header/>
      <Component {...pageProps} />
      <Footer/>
    </div>
  )
}