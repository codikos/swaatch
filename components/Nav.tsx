import { faAngleDoubleLeft, faHome, faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';
import Image from 'next/image';

import ButtonBack from '@components/ButtonBack';
import LinkIcon from '@components/LinkIcon';
import { useTheme } from 'next-themes';
import Link from 'next/link';

export default function Nav() {
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  return (
    <nav className="fixed z-10 flex justify-between w-screen bg-white xl:bg-transparent 2xl:bg-transparent dark:bg-gray-900 xl:dark:bg-transparent 2xl:dark:bg-transparent">
      <div className="flex flex-row items-center p-4">
        {router.pathname !== '/' && (
          <Link href="/">
            <a
              title="Swaatch"
              className="items-center justify-center hidden w-20 h-20 m-auto mr-6 rounded-full outline-none cursor-pointer transition xl:flex 2xl:flex xl:relative 2xl:relative xl:hover:bg-gray-100 2xl:hover:bg-gray-100 xl:dark:hover:bg-gray-800 2xl:dark:hover:bg-gray-800 focus:ring-2 focus:ring-gray-700 dark:focus:ring-gray-200"
            >
              <Image src="/1x/logo.png" layout="intrinsic" width={50} height={50} alt="Swaatch" />
            </a>
          </Link>
        )}
        <ul className="flex items-center">
          {router.pathname !== '/primary' && router.pathname !== '/' && (
            <li>
              <LinkIcon href="/" title="Start over" icon={faAngleDoubleLeft} />
            </li>
          )}
          {router.pathname !== '/' && (
            <li>
              {router.pathname === '/primary' && <LinkIcon href="/" title="Home" icon={faHome} />}
              {router.pathname !== '/primary' && <ButtonBack />}
            </li>
          )}
        </ul>
      </div>
      {router.pathname !== '/' && (
        <Link href="/">
          <a
            title="swaatch"
            className="absolute flex items-center justify-center w-20 h-20 m-auto rounded-full outline-none cursor-pointer xl:hidden 2xl:hidden hover:bg-gray-100 top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 dark:hover:bg-gray-800 focus:ring-2 focus:ring-gray-700 dark:focus:ring-gray-200"
          >
            <Image src="/1x/logo.png" layout="intrinsic" width={50} height={50} alt="Swaatch" />
          </a>
        </Link>
      )}
      <ul className="flex items-center p-4">
        <li>
          <button className="btn-nav-circle" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
            <FontAwesomeIcon icon={theme === 'light' ? faMoon : faSun} />
          </button>
        </li>
      </ul>
    </nav>
  );
}
