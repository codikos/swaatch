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
      <div className="flex flex-col h-screen p-10 bg-white dark:bg-gray-900 place-content-center">
        <h1 className="p-5 mx-auto text-5xl font-bold text-center text-transparent w-max bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-500">
          Swaatch!
        </h1>
        <h2 className="mt-5 text-2xl text-center">Generate accessible color palettes easily.</h2>
        <div className="flex flex-row my-10 place-content-center">
          <Link href="/primary">
            <a className="btn-blue">Let's begin!</a>
          </Link>
        </div>
      </div>
    </div>
  );
}
