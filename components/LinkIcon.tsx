import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function LinkIcon({ icon, title, href }) {
  return (
    <Link href={href}>
      <a
        title={title}
        className="transition text-gray-700 no-underline text-accent-1 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-800 h-14 w-14 flex items-center justify-center rounded-full"
      >
        <FontAwesomeIcon icon={icon} />
      </a>
    </Link>
  );
}
