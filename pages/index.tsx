import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';
import { useTheme } from 'next-themes';

import Nav from '@components/Nav';

export default function IndexPage() {
  const { theme } = useTheme();
  const imageSrc = `/1x/logo-full-${theme}.png`;
  return (
    <div>
      <Head>
        <title>Swaatch - an easy way to generate color palettes for your design system.</title>
        <meta
          name="description"
          content="Swaatch is an application that allows users to easily generate color palettes for their design systems. It can calculate the best contrasts based on WCAG recommendations."
        />
      </Head>
      <Nav />
      <div className="flex flex-col h-screen p-10 bg-white dark:bg-gray-900 place-content-center">
        <div className="mx-auto">
          <Image src={imageSrc} layout="intrinsic" width={339} height={100} alt="Swaatch" />
        </div>
        <h2 className="mt-10 text-2xl text-center">
          Easily generate accessible color palettes that follows{' '}
          <abbr title="Web Content Accessibility Guidelines">WCAG</abbr> 2.0 recommendations.
        </h2>
        <div className="flex flex-row mt-10 place-content-center">
          <Link href="/primary">
            <a className="btn-blue">Let's begin!</a>
          </Link>
        </div>
      </div>
    </div>
  );
}
