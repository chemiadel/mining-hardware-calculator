import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <title>Mining hardware calculator</title>
          <meta name="description" content="Mining Profit Calculator with ability of selecting Hardware with quantity, That help you to calculate income and loss and decide what hardware more helpful for mining.
"></meta>
          <link rel="shortcut icon" href="/favicon.ico" />
          <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4357693848358455" crossOrigin="anonymous"></script>
          <script async src="https://www.googletagmanager.com/gtag/js?id=G-CKCRS9ED21"></script>
          <script
            dangerouslySetInnerHTML={{
              __html:`window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
            
              gtag('config', 'G-CKCRS9ED21');`
            }}
          />
                    <script
            dangerouslySetInnerHTML={{
              __html:`window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
            
              gtag('config', 'G-CKCRS9ED21');`
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument