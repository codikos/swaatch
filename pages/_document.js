import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    const isProduction = process.env.NODE_ENV === 'production';
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
