import { faHome } from '@fortawesome/free-solid-svg-icons';
import LinkIcon from './LinkIcon';

export default function Nav() {
  return (
    <nav>
      <ul className="flex items-center justify-between p-8">
        <li>
          <LinkIcon href="/" title="home" icon={faHome} />
        </li>
      </ul>
    </nav>
  );
}
