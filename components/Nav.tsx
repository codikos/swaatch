import { faAngleDoubleLeft, faHome } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';

import ButtonBack from '@components/ButtonBack';
import LinkIcon from '@components/LinkIcon';

export default function Nav() {
  const router = useRouter();

  return (
    <nav className="fixed w-screen bg-white xl:bg-transparent 2xl:bg-transparent dark:bg-gray-900">
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
    </nav>
  );
}
