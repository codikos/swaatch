import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';

export default function ButtonBack() {
  const router = useRouter();
  return (
    <a onClick={() => router.back()} title="Previous Step" className="btn-nav">
      <FontAwesomeIcon icon={faAngleLeft} />
      <span className="hidden ml-2 sm:hidden md:hidden lg:inline xl:inline 2xl:inline">Previous Step</span>
    </a>
  );
}
