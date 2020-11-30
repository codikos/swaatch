import Link from 'next/link';
import Head from 'next/head';

export default function IndexPage() {
  return (
    <div>
      <Head>
        <title>Swaatch - an easy way to generate color palettes for your design system.</title>
        <meta
          name="description"
          content="Swaatch is an application that allows users to easily generate color palettes for their design systems. It can calculate the best contrasts based on WCAG recommendations."
        />
      </Head>
      <div className="flex flex-col place-content-center h-screen">
        <h1 className="text-5xl text-center text-gray-800 dark:text-gray-100">Swaatch!</h1>
        <h2 className="text-2xl mt-5 text-center text-gray-500 dark:text-gray-300">
          Generate accessible color palettes easily.
        </h2>
        <div className="flex flex-row place-content-center my-10">
          <Link href="/primary">
            <a className="btn-blue">Let's begin!</a>
          </Link>
        </div>
      </div>
    </div>
  );
}
