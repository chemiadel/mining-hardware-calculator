import 'tailwindcss/tailwind.css'
import type { AppProps  } from 'next/app'
import NextNprogress from 'nextjs-progressbar';
import Layout from 'components/layout'

function MyApp({ Component, pageProps }: AppProps) {


  return <>
  <NextNprogress options={{
    showSpinner:false
  }} />
    <Layout>
        <Component {...pageProps} options={{ showSpinner: false }}/>
    </Layout>
  </>
}

export default MyApp
