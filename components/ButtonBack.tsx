import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';

export default function ButtonBack() {
  const router = useRouter();
  return (
    <a onClick={() => router.back()} title="Go back" className="btn-nav">
      <FontAwesomeIcon icon={faArrowLeft} />
    </a>
  );
}
