import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';
import React from 'react';

export default function ButtonBack() {
  const router = useRouter();
  return (
    <a onClick={() => router.back()} tabIndex={0} title="Previous Step" className="btn-nav">
      <FontAwesomeIcon icon={faAngleLeft} />
      <span className="hidden lg:block">Previous Step</span>
    </a>
  );
}
