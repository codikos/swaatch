import { faHome } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';

import ButtonBack from '@components/ButtonBack';
import LinkIcon from '@components/LinkIcon';

export default function Nav() {
  const router = useRouter();

  return (
    <nav>
      <ul className="flex items-center justify-between p-8">
        <li>
          {router.pathname === '/primary' && <LinkIcon href="/" title="home" icon={faHome} />}
          {router.pathname !== '/primary' && <ButtonBack />}
        </li>
      </ul>
    </nav>
  );
}
