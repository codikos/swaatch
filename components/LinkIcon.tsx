import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

type Props = {
  icon: IconProp;
  title: string;
  href: string;
}

export default function LinkIcon({ icon, title, href }: Props) {
  return (
    <Link href={href}>
      <a title={title} className="btn-nav">
        <FontAwesomeIcon icon={icon} />
        <span className="hidden ml-2 sm:hidden md:hidden lg:inline xl:inline 2xl:inline">{title}</span>
      </a>
    </Link>
  );
}
