import type { DocumentContext, DocumentInitialProps } from 'next/document';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import React from 'react';

type DocumentProps = {
  isProduction: boolean
}

class MyDocument extends Document<DocumentProps> {
  static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps & DocumentProps> {
    const initialProps = await Document.getInitialProps(ctx);
    const isProduction = process.env.VERCEL_ENV && process.env.VERCEL_ENV === 'production';
    return { ...initialProps, isProduction };
  }

  render() {
    const { isProduction } = this.props;
    return (
      <Html lang="en">
        <Head>
          {isProduction && (
            <>
              <script
                async
                src="https://ackee-xi-woad.vercel.app/tracker.js"
                data-ackee-server="https://ackee-xi-woad.vercel.app"
                data-ackee-domain-id="dc40b783-d5d2-4b45-9e57-ea6043be27fb"
              ></script>
            </>
          )}
          <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
          <link rel="manifest" href="/favicon/site.webmanifest" />
          <link rel="mask-icon" href="/favicon/safari-pinned-tab.svg" color="#5bbad5" />
          <meta name="msapplication-TileColor" content="#da532c" />
          <meta name="theme-color" content="#ffffff" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
