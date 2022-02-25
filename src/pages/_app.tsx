//_app.tsxは共通なので全てのページに反映させるものをここに書く
//ex) Header, Footerなど

import { AppProps } from "next/app";
import Footer from "../components/footer";
import Header from "../components/header";
import "styles/globals.css";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Header />
      <main role="main" className="max-w-3xl mx-auto">
        <Component {...pageProps} />
      </main>
      <Footer />
    </div>
  );
}
