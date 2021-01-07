import { faAngleDoubleLeft, faHome, faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';

import ButtonBack from '@components/ButtonBack';
import LinkIcon from '@components/LinkIcon';
import { useTheme } from 'next-themes';

export default function Nav() {
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  return (
    <nav className="fixed flex justify-between w-screen bg-white xl:bg-transparent 2xl:bg-transparent dark:bg-gray-900 xl:dark:bg-transparent 2xl:dark:bg-transparent">
      <ul className="flex items-center p-4">
        {router.pathname !== '/primary' && (
          <li>
            <LinkIcon href="/" title="Start over" icon={faAngleDoubleLeft} />
          </li>
        )}
        <li>
          {router.pathname === '/primary' && <LinkIcon href="/" title="Home" icon={faHome} />}
          {router.pathname !== '/primary' && <ButtonBack />}
        </li>
      </ul>
      <ul className="flex items-center p-4">
        <li>
          <button className="btn-nav" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
            <FontAwesomeIcon icon={theme === 'light' ? faMoon : faSun} />
          </button>
        </li>
      </ul>
    </nav>
  );
}
