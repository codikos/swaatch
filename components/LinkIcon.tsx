import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function LinkIcon({ icon, title, href }) {
  return (
    <Link href={href}>
      <a title={title} className="btn-nav">
        <FontAwesomeIcon icon={icon} />
      </a>
    </Link>
  );
}
