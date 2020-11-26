import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

export default function Nav() {
  return (
    <nav>
      <ul className="flex items-center justify-between p-8">
        <li>
          <Link href="/">
            <a
              title="home"
              className="text-blue-500 no-underline text-accent-1 dark:text-blue-300 hover:bg-gray-200 h-14 w-14 flex items-center justify-center rounded-full"
            >
              <FontAwesomeIcon icon={faArrowLeft} />
            </a>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
