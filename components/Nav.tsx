import { faAngleDoubleLeft, faHome, faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';
import Image from 'next/image';
import React from 'react';

import ButtonBack from '@components/ButtonBack';
import LinkIcon from '@components/LinkIcon';
import { useTheme } from 'next-themes';
import Link from 'next/link';

export default function Nav() {
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  return (
    <nav className="fixed justify-between z-10 flex w-screen bg-white dark:bg-gray-900">
      <div className="flex flex-row items-center p-2 xl:ml-4 xl:space-x-6">
        {router.pathname !== '/' && (
          <Link href="/">
            <a
              title="Swaatch"
              className="items-center justify-center absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 xl:translate-x-0 xl:translate-y-0 xl:inset-auto outline-none cursor-pointer transition xl:flex xl:relative"
            >
              <Image src="/1x/logo.png" layout="intrinsic" width={50} height={50} alt="Swaatch" />
            </a>
          </Link>
        )}
        <div className="flex flex-row space-x-2 w-full">
          {router.pathname !== '/primary' && router.pathname !== '/' && (
            <LinkIcon href="/" title="Start over" icon={faAngleDoubleLeft} />
          )}
          {router.pathname !== '/' && (
            <>
              {router.pathname === '/primary' && <LinkIcon href="/" title="Home" icon={faHome} />}
              {router.pathname !== '/primary' && <ButtonBack />}
            </>
          )}
        </div>
      </div>
      <div className="flex items-center p-4">
        <button className="btn-nav-circle" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
          <FontAwesomeIcon icon={theme === 'light' ? faMoon : faSun} />
        </button>
      </div>
    </nav>
  );
}
