import { faAngleDoubleLeft, faHome } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';

import ButtonBack from '@components/ButtonBack';
import LinkIcon from '@components/LinkIcon';

export default function Nav() {
  const router = useRouter();

  return (
    <nav>
      <ul className="flex items-center p-8">
        {router.pathname !== '/primary' && (
          <li>
            <LinkIcon href="/" title="Start over" icon={faAngleDoubleLeft} />
          </li>
        )}
        <li>
          {router.pathname === '/primary' && <LinkIcon href="/" title="home" icon={faHome} />}
          {router.pathname !== '/primary' && <ButtonBack />}
        </li>
      </ul>
    </nav>
  );
}
